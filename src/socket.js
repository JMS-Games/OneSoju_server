const SIG = require('./signal');
const CONFIG = require('./config');
const CODE = require('./code');

const Player = require('./player');
const GameManager = require('./gamemanager');
const GM = new GameManager();

class SocketManager {
    constructor(io) {
        this.io = io;
        this._pid = 0;
    }

    getIo() {
        return this.io;
    }

    boot() {
        this.io.on('connection', (socket) => {
            let curPlayer = null;

            socket.on('disconnect', () => {
                !!curPlayer && console.log(`client disconnected from socket id: ${socket.id}, player uuid: ${curPlayer.uuid}`);
                curPlayer && GM.removePlayer(curPlayer, this.io);
            });

            socket.on(SIG.REQUEST_MATCH, (req, res) => {
                console.log(`new player uuid: ${req.uuid}, socket id: ${socket.id}`);
                if (CONFIG.MODE === 'development') {
                    curPlayer = new Player(socket.id, this._pid++);
                } else {
                    curPlayer = new Player(socket.id, req.uuid);
                }
                GM.addPlayer(curPlayer, res, this.io);
            });

            socket.on(SIG.START_GAME, (req, res) => {
                GM.startGame(curPlayer, SIG.START_GAME, res, this.io);
            });

            socket.on(SIG.DRAW_CARD, (req, res) => {
                GM.drawCard(curPlayer, res, this.io);
            });

            socket.on(SIG.USE_CARD, (req, res) => {
                GM.playCard(curPlayer, req.nextCard, req.wish, res, this.io);
            });

        });
    }
}

module.exports = SocketManager;