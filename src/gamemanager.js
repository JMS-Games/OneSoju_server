const CODE = require('./code');
const STATE = require('./state');
const Checker = require('./checker').getInstance();
const Room = require('./room');

const GameManager = (function() {
    let instance;

    function init() {
        return {
            createRoom: function() {
                if (this.curRoom && this.curRoom.getIsValid()) {
                    return false;
                }
                const tmpRoom = new Room();
                this.rooms.push(tmpRoom);
                this.curRoom = tmpRoom;
                return true;
            },

            addPlayer: function(player, res) {
                const isRoom = this.curRoom ? this.curRoom.addPlayer(player) : false;
                isRoom || this.createRoom() && this.curRoom.addPlayer(player);
                this.players.push(player);

                res({
                    CODE: CODE.OK,
                    room: player.getRoom()
                });
            },

            removePlayer: function(player) {
                const room = player.getRoom();
                const gameInfo = room.getGameInfo();
                const id = room.removePlayer(player);

                if (player.isAdmin) {
                    const cPlayer = this.findPlayerById(id);
                    cPlayer.isAdmin = true;
                }

                this.players[this.players.findIndex(element => element.uuid === player.uuid)] = null;

                if (gameInfo && (gameInfo.state === STATE.BEFORE_START || gameInfo.state === STATE.GAME_FINISHED)) {
                    return;
                }

                gameInfo && gameInfo.sideDeque.add(gameInfo.hands[player.uuid]);
            },

            startGame: function(player, sig, res, io) {
                const room = player.isAdmin ? player.getRoom() : null;
                const code = (room && room.headCount >= 2) ? CODE.OK : CODE.ERROR;
                room && room.startGame();
                this.broadcastHand(player, sig, res, io, code);
            },

            playCard: function(player, card, res) {
                const room = player.getRoom();
                const gameInfo = room.getGameInfo();
                if (Checker.isIllegal(gameInfo.curCard, card, gameInfo.hands[player.uuid])) {
                    res({
                        CODE: CODE.ERROR,
                        msg: "Invalid Card request"
                    });
                    return;
                }
                gameInfo.playCard(card);
                res({
                    CODE: CODE.OK
                });
            },

            broadcastRoom: function(curPlayer, sig, res, io) {
                for (const player of curPlayer.getRoom().players) {
                    io.to(player.id).emit(sig, res);
                }
            },

            broadcastHand: function(curPlayer, sig, res, io, code) {
                const gameInfo = curPlayer.getRoom().getGameInfo();
                for (const player of curPlayer.getRoom().players) {
                    io.to(player.id).emit(sig, res({
                        CODE: code,
                        CURRENT_CARD : gameInfo.curCard,
                        YOUR_HAND: gameInfo.hands[player.uuid],
                    }));
                }
            },

            findPlayerById: function(id) {
                return this.players.find(element => element && element.id === id);
            },

            curRoom: null,
            rooms: [],
            players: []
        }
    }

    return {
        getInstance: function() {
            if (instance) {
                return instance;
            }
            instance = init();
            return instance;
        }
    }
})();

module.exports = GameManager;