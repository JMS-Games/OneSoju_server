const app = require('express')();
const server = require('http').createServer(app);

const io = require('socket.io')(server);

const SIG = require('src/signal');

server.listen(3000, () => {
    console.log("server is listening on 3000");
});

io.on('connection', (socket) => {
    console.log(`client connected. client id: ${socket.id}`);
    socket.on('disconnect', () => {
       console.log(`client disconnected from client id: ${socket.id}`);
    });

    socket.on(SIG.JOIN_ROOM, () => {

    });
});
