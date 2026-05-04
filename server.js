import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server);

// Track displays and remotes by room
let displays = {}; // { roomId: socketId }
let remoteClientCounts = {}; // { roomId: count }
let displayState = {}; // { roomId: { ...lastValues } }
let resetTimers = {}; // { roomId: timeoutId } - timers for auto-reset after 3 sec inactivity

// Generate unique room ID
function generateRoomId() {
    return 'room-' + Math.random().toString(36).substr(2, 9);
}

function updateAutoState(roomId) {
    const displaySocketId = displays[roomId];
    if (displaySocketId) {
        const displaySocket = io.sockets.sockets.get(displaySocketId);
        if (displaySocket) {
            const shouldAutoPlay = (remoteClientCounts[roomId] || 0) === 0;
            displaySocket.emit('auto-control', { autoMove: shouldAutoPlay });
            console.log(`→ Sent auto state to display ${roomId}: autoMove = ${shouldAutoPlay} (remoteClientsCount=${remoteClientCounts[roomId] || 0})`);
        }
    } else {
        console.log(`✗ updateAutoState: No display socket connected for room ${roomId}`);
    }
}

app.use(express.static(join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

app.get('/remote', (req, res) => {
    res.sendFile(join(__dirname, 'remote.html'));
});

io.on('connection', (socket) => {
    console.log('✓ CLIENT connected! Socket ID:', socket.id);
    console.log('Total connected clients:', io.engine.clientsCount);

    socket._roomId = null;
    socket._isDisplay = false;
    socket._isRemote = false;

    socket.on('join-display', () => {
        const roomId = generateRoomId();
        socket._roomId = roomId;
        socket._isDisplay = true;
        displays[roomId] = socket.id;
        remoteClientCounts[roomId] = 0;
        socket.join(roomId);

        console.log(`✓ DISPLAY identified. Socket ID: ${socket.id}, Room: ${roomId}`);
        socket.emit('display-room-id', { roomId });

        // If there's NO saved state for this room, send reset signal
        if (!displayState[roomId]) {
            console.log(`✓ No previous state for room ${roomId}, display will use defaults`);
            socket.emit('reset-to-defaults');
        } else {
            console.log(`✓ Previous state exists for room ${roomId}, display will use stored state`);
        }

        updateAutoState(roomId);
    });

    socket.on('join-remote', (data) => {
        const roomId = data?.roomId;
        if (!roomId || !displays[roomId]) {
            console.log(`✗ REMOTE rejected: Invalid room ID ${roomId}`);
            socket.emit('remote-join-failed', { error: 'Invalid room ID' });
            return;
        }

        socket._roomId = roomId;
        socket._isRemote = true;
        remoteClientCounts[roomId] = (remoteClientCounts[roomId] || 0) + 1;
        socket.join(roomId);

        // Cancel any pending reset timer
        if (resetTimers[roomId]) {
            clearTimeout(resetTimers[roomId]);
            delete resetTimers[roomId];
            console.log(`→ Cancelled reset timer for room ${roomId}`);
        }

        console.log(`✓ REMOTE joined room ${roomId}. Count: ${remoteClientCounts[roomId]}`);
        socket.emit('remote-join-success', { roomId });

        // Send current display state to the remote if it exists
        if (displayState[roomId]) {
            console.log(`→ Existing state found for room ${roomId}, syncing state`);
            socket.emit('values-sync', displayState[roomId]);
            console.log(`→ Sent current state to remote in room ${roomId}`);
        } else {
            console.log(`→ No state exists yet for room ${roomId}, remote will show demo`);
        }

        updateAutoState(roomId);
    });

    socket.on('send-to-display', (data) => {
        if (!data) {
            console.log('✗ Received null/undefined data, ignoring');
            return;
        }

        const roomId = socket._roomId;
        if (!roomId) {
            console.log('✗ send-to-display: Socket not in a room');
            return;
        }

        // Store the current state in the room
        displayState[roomId] = data;

        // Send to all clients in this room
        io.to(roomId).emit('render-data', data);
        // Sync to other remotes in the same room
        socket.broadcast.to(roomId).emit('values-sync', data);
    });

    socket.on('disconnect', () => {
        console.log('✗ CLIENT disconnected. Socket ID:', socket.id);
        const roomId = socket._roomId;

        if (socket._isDisplay && roomId) {
            console.log(`  └─ Was the DISPLAY for room ${roomId}`);
            delete displays[roomId];
            // Display state persists for remotes to reconnect
            console.log(`  └─ Display state for room ${roomId} preserved for reconnecting remotes`);
        } else if (socket._isRemote && roomId) {
            remoteClientCounts[roomId] = Math.max(0, (remoteClientCounts[roomId] || 0) - 1);
            console.log(`  └─ Was a REMOTE for room ${roomId} (${remoteClientCounts[roomId]} left)`);

            // If no more remotes, start auto-reset timer
            if ((remoteClientCounts[roomId] || 0) === 0) {
                console.log(`→ No remotes left in room ${roomId}. Starting 3-second reset timer...`);
                resetTimers[roomId] = setTimeout(() => {
                    delete displayState[roomId];
                    delete resetTimers[roomId];
                    console.log(`✓ Auto-reset: Cleared state for room ${roomId} after 3 seconds inactivity`);
                }, 3000);
            }

            // Check if anyone is still in this room
            const displayExists = !!displays[roomId];
            const remotesExist = (remoteClientCounts[roomId] || 0) > 0;

            if (!displayExists && !remotesExist) {
                console.log(`  └─ Room ${roomId} is completely empty`);
            } else {
                console.log(`  └─ Room ${roomId} still has clients, state preserved`);
            }

            updateAutoState(roomId);
        }
    });
});

server.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});