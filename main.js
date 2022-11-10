const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const SIG = require('./src/signal');
const GM = require('./src/gamemanager').getInstance();
const Player = require('./src/player');



server.listen(3000, () => {
    console.log("server is listening on 3000");
});

io.on('connection', (socket) => {
    let curPlayer = null;

    socket.on('disconnect', () => {
        console.log(`client disconnected from socket id: ${socket.id}, player uuid: ${curPlayer.uuid}`);
        if (!curPlayer) {
           return;
        }

        GM.removePlayer(curPlayer);
    });

    socket.on(SIG.REQUEST_MATCH, (req, res) => {
        curPlayer = new Player(socket.id, req.uuid);
        GM.addPlayer(curPlayer, res);
    });

    socket.on(SIG.START_GAME, (req, res) => {
        GM.startGame(curPlayer, res);
    });

    socket.on(SIG.JOIN_ROOM, (req, res) => {
        const msg = {msg: `player ${curPlayer.uuid} joined!`};
        for (const player in curPlayer.getRoom().players) {
            io.to(player.id).emit(SIG.JOIN_ROOM, msg);
        }
    });

    socket.on(SIG.EXIT_ROOM, (req, res) => {
        const msg = {msg: `player ${curPlayer.uuid} left the room.`};
        for (const player in curPlayer.getRoom().players) {
            io.to(player.id).emit(SIG.EXIT_ROOM, msg);
        }
    });

});
