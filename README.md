# DSR Interactive

An interactive display system with remote control capabilities using Node.js, Express, and Socket.io.

## Features

- **Display Page**: Main visualization page using p5.js
- **Remote Control**: Control the display from a mobile or web-based remote
- **Real-time Communication**: WebSocket connections via Socket.io
- **QR Code Integration**: Easy access to remote control via generated QR codes
- **Auto Mode**: Automatic parameter adjustment when no remote is connected
- **Multi-Phone Sync**: Multiple remotes see the same values in real-time (all sliders stay synchronized)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. Navigate to the project directory:
```bash
cd DSR-Interactive
```

2. Install dependencies:
```bash
npm install
```

### Running the Project

Start the server:
```bash
npm start
```

The application will start on `http://localhost:3000`

### Accessing the Application

#### Local Machine
- **Display Page**: `http://localhost:3000`
- **Remote Control**: `http://localhost:3000/remote`

#### From Other Devices on the Network
- Find your machine's IP address (e.g., `192.168.1.100`)
- **Display Page**: `http://<your-ip>:3000` (e.g., `http://192.168.1.100:3000`)
- **Remote Control**: `http://<your-ip>:3000/remote`

#### QR Code
The display page shows a QR code in the top-right corner that links to the remote control for easy access

## Project Structure

```
DSR-Interactive/
├── index.html          # Main display page
├── remote.html         # Remote control page
├── server.js           # Express server setup
├── package.json        # Project dependencies
├── assets/             # CSS and favicon files
├── libraries/          # p5.js and sound libraries
└── src/                # JavaScript source files
    ├── main.js         # Main visualization logic
    ├── panels.js       # UI panel components
    ├── values.js       # Value management
    └── coloursHSL.js   # Color utilities
```

## Dependencies

- **express**: Web server framework
- **socket.io**: Real-time bidirectional communication
- **dotenv**: Environment variable management
- **p5.js**: Creative coding library for visualization

## Configuration

You can customize the server port by setting the `PORT` environment variable:
```bash
PORT=8080 npm start
```

The default port is `3000` if not specified.

## Usage Guide

### Auto Mode
- **Default Behavior**: When no remote is connected, the display automatically cycles through random parameter combinations
- **Manual Control**: As soon as you connect a remote, Auto Mode stops and you take full control
- **Parameters Affected**: Size, Density, Colour, Visibility, and other visual parameters cycle smoothly with easing

### Multi-Phone Sync
- **Connected Multiple Phones?** All phones see synchronized control values in real-time
- **How it Works**: When one phone adjusts a slider, all other connected phones automatically update to show the same value
- **Use Case**: Multiple people collaborating to design the visualization from different devices

## License

ISC
