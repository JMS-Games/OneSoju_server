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
                curPlayer && GM.removePlayer(curPlayer, this.io);
            });

            socket.on(SIG.REQUEST_MATCH, (req, res) => {
                curPlayer = new Player(socket.id, req.uuid);
                GM.addPlayer(curPlayer, res, this.io);
            });

            socket.on(SIG.START_GAME, (req, res) => {
                GM.startGame(curPlayer, SIG.START_GAME, res, this.io);
            });

            socket.on(SIG.DRAW_CARD, (req, res) => {
                GM.drawCard(curPlayer, res).then(() => {
                    GM.startTurn(curPlayer, this.io);
                });
            });

            socket.on(SIG.USE_CARD, (req, res) => {
                GM.playCard(curPlayer, req.nextCard, req.wish, res).then(() => {
                    GM.startTurn(curPlayer, this.io);
                });
            });

        });
    }
}

module.exports = SocketManager;