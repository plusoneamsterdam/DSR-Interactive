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

let displaySocket = null;
let remoteClientsCount = 0;

function updateAutoState() {
    if (displaySocket) {
        const shouldAutoPlay = remoteClientsCount === 0;
        displaySocket.emit('auto-control', { autoMove: shouldAutoPlay });
        console.log(`→ Sent auto state to display: autoMove = ${shouldAutoPlay} (remoteClientsCount=${remoteClientsCount})`);
    } else {
        console.log('✗ updateAutoState: No display socket connected');
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

    // Track if this socket is the display or a remote
    socket._isDisplay = false;

    socket.on('join-display', () => {
        displaySocket = socket;
        socket._isDisplay = true;
        console.log('✓ DISPLAY identified. Socket ID:', socket.id);
        updateAutoState();
    });

    socket.on('send-to-display', (data) => {
        // Guard against null/undefined data (e.g., sent before setup() completes)
        if (!data) {
            console.log('✗ Received null/undefined data, ignoring');
            return;
        }

        console.log('✓ DATA received. Type:', data.button ? 'BUTTON' : 'SLIDER');
        // Mark as remote if it hasn't been marked yet
        if (!socket._isDisplay && socket._markedAsRemote !== true) {
            remoteClientsCount++;
            socket._markedAsRemote = true;
            console.log(`✓ REMOTE identified (${remoteClientsCount} remotes connected)`);
            updateAutoState();
        }

        // Send to display
        if (displaySocket) {
            displaySocket.emit('render-data', data);
        } else {
            console.log('✗ No display socket connected, dropping data');
        }

        // Broadcast to other remotes so they see the same values
        socket.broadcast.emit('values-sync', data);
    });

    socket.on('disconnect', () => {
        console.log('✗ CLIENT disconnected. Socket ID:', socket.id);
        if (socket._isDisplay) {
            displaySocket = null;
            console.log('  └─ Was the DISPLAY');
        } else if (socket._markedAsRemote) {
            remoteClientsCount = Math.max(0, remoteClientsCount - 1);
            console.log(`  └─ Was a REMOTE (${remoteClientsCount} remotes left)`);
            updateAutoState();
        }
    });
});

server.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});