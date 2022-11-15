const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const SocketManager = require('./src/socket').getInstance(io);

const CONFIG = require('./src/config');

server.listen(CONFIG.PORT, () => {
    console.log(`server is listening on ${CONFIG.PORT}`);
});

SocketManager.boot();
