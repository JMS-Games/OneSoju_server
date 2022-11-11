const CODE = require('./code');
const STATE = require('./state');
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

                res({
                    CODE: CODE.OK,
                    room: player.getRoom()
                });
            },

            removePlayer: function(player) {
                const room = player.getRoom();
                const gameInfo = room.getGameInfo();

                room.removePlayer(player);

                if (gameInfo.state === STATE.BEFORE_START || gameInfo.state === STATE.GAME_FINISHED) {
                    return;
                }

                for (const card in gameInfo.hands[player.uuid]) {
                    gameInfo.sideDeque.add(card);
                }
            },

            startGame: function(player, res) {
                const room = player.isAdmin ? player.getRoom() : null;
                const code = (room && room.headCount >= 2) ? CODE.OK : CODE.ERROR;
                room && room.startGame();
                const gameInfo = room ? room.getGameInfo() : null;
                res({
                    CODE: code,
                    CURRENT_CARD: gameInfo.curCard,
                    HAND: gameInfo.hands[player.uuid]
                });
            },

            broadcastRoom: function(curPlayer, sig, res, io) {
                for (const player in curPlayer.getRoom().players) {
                    io.to(player.id).emit(sig, res);
                }
            },

            curRoom: null,
            rooms: [],
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