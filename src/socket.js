const SIG = require('./signal');
const CODE = require('./code');

const Player = require('./player');
const GameManager = require('./gamemanager');
const GM = new GameManager();

class SocketManager {
    constructor(io) {
        this.io = io;
    }

    getIo() {
        return this.io;
    }

    boot() {
        this.io.on('connection', (socket) => {
            let curPlayer = null;

            socket.on('disconnect', () => {
                console.log(`client disconnected from socket id: ${socket.id}, player uuid: ${curPlayer.uuid}`);
                curPlayer && GM.removePlayer(curPlayer);
            });

            socket.on(SIG.REQUEST_MATCH, (req, res) => {
                curPlayer = new Player(socket.id, req.uuid);
                GM.addPlayer(curPlayer, res);
            });

            socket.on(SIG.START_GAME, (req, res) => {
                GM.startGame(curPlayer, SIG.START_GAME, res, this.io);
            });

            socket.on(SIG.JOIN_ROOM, (req, res) => {
                GM.broadcastRoom(curPlayer, SIG.JOIN_ROOM, {CODE: CODE.OK, msg: `player ${curPlayer.uuid} joined!`}, this.io);
            });

            socket.on(SIG.EXIT_ROOM, (req, res) => {
                GM.broadcastRoom(curPlayer, SIG.EXIT_ROOM, {CODE: CODE.OK, msg: `player ${curPlayer.uuid} left the room.`}, this.io);
            });

            socket.on(SIG.USE_CARD, (req, res) => {
                GM.playCard(curPlayer, req.nextCard, res);
            });

        });
    }
}

module.exports = SocketManager;