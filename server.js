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

app.use(express.static(join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

app.get('/remote', (req, res) => {
    res.sendFile(join(__dirname, 'remote.html'));
});

io.on('connection', (socket) => {
    socket.on('join-display', () => {
        displaySocket = socket;
        console.log('Display connected! Socket ID:', socket.id);
    });

    socket.on('send-to-display', (data) => {
        console.log('Forwarding data to display:', data);
        if (displaySocket) {
            displaySocket.emit('render-data', data);
        }
    });

    socket.on('disconnect', () => {
        if (displaySocket === socket) {
            displaySocket = null;
        }
        console.log('User disconnected. Socket ID:', socket.id);
    });
});

server.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});