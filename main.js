const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const SIG = require('./src/signal');
const CONFIG = require('./src/config');
const CODE = require('./src/code');

const GM = require('./src/gamemanager').getInstance();
const Player = require('./src/player');


server.listen(CONFIG.PORT, () => {
    console.log(`server is listening on ${CONFIG.PORT}`);
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
        GM.startGame(curPlayer, SIG.START_GAME, res, io);
    });

    socket.on(SIG.JOIN_ROOM, (req, res) => {
        GM.broadcastRoom(curPlayer, SIG.JOIN_ROOM, {CODE: CODE.OK, msg: `player ${curPlayer.uuid} joined!`});
    });

    socket.on(SIG.EXIT_ROOM, (req, res) => {
        GM.broadcastRoom(curPlayer, SIG.EXIT_ROOM, {CODE: CODE.OK, msg: `player ${curPlayer.uuid} left the room.`});
    });

});
