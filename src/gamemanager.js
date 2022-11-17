const CODE = require('./code');
const STATE = require('./state');
const Checker = require('./checker');
const Room = require('./room');

class GameManager {
    constructor() {
        this.curRoom = null;
        this.rooms = [];
        this.players = [];
        this.checker = new Checker();
    }

    createRoom() {
        if (this.curRoom && this.curRoom.getIsValid()) {
            return false;
        }
        const tmpRoom = new Room();
        this.rooms.push(tmpRoom);
        this.curRoom = tmpRoom;
        return true;
    }

    addPlayer(player, res) {
        const isRoom = this.curRoom ? this.curRoom.addPlayer(player) : false;
        isRoom || this.createRoom() && this.curRoom.addPlayer(player);
        this.players.push(player);

        res({
            CODE: CODE.OK,
            room: player.getRoom()
        });
    }

    removePlayer(player) {
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
    }

    startGame(player, sig, res, io) {
        const room = player.isAdmin ? player.getRoom() : null;
        const code = (room && room.headCount >= 2) ? CODE.OK : CODE.ERROR;
        room && room.startGame();
        this.broadcastHand(player, sig, res, io, code);
    }

    playCard(player, card, res) {
        const room = player.getRoom();
        const gameInfo = room.getGameInfo();
        if (this.checker.isIllegal(gameInfo.curCard, card, gameInfo.hands[player.uuid])) {
            res({CODE: CODE.ERROR});
        } else {
            gameInfo.playCard(card);
            res({CODE: CODE.OK});
        }
    }

    broadcastRoom(curPlayer, sig, res, io) {
        const room = curPlayer.getRoom();
        room.players.forEach(element => {
            io.to(element.id).emit(sig, res);
        });
    }

    broadcastHand(curPlayer, sig, res, io, code) {
        const room = curPlayer.getRoom();
        const gameInfo = room.getGameInfo();
        room.players.forEach(element => {
            io.to(element.id).emit(sig, res({
                CODE: code,
                currentCard: gameInfo ? gameInfo.curCard : null,
                yourHand: gameInfo ? gameInfo.hands[element.uuid] : null
            }));
        });
    }

    findPlayerById(id) {
        return this.players.find(element => element && element.id === id);
    }
}

module.exports = GameManager;