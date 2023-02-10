const CODE = require('./code');
const STATE = require('./state');
const SIG = require('./signal');
const Checker = require('./checker');
const checker = new Checker();
const Room = require('./room');

class IDManager {
    constructor() {
        this.roomId = (0 | Math.random() * 998);
    }

    getNewRoomID() {
        return this.roomId++;
    }
}
const IDM = new IDManager();

class GameManager {
    constructor() {
        this.curRoom = null;
        this.rooms = {};
        this.players = [];
    }

    createRoom() {
        if (this.curRoom && this.curRoom.getIsValid()) {
            return false;
        }
        const roomID = IDM.getNewRoomID();
        const tmpRoom = new Room(roomID);
        this.rooms[roomID] = tmpRoom;
        this.curRoom = tmpRoom;
        return true;
    }

    addPlayer(player, res, io) {
        const isRoom = this.curRoom ? this.curRoom.addPlayer(player) : false;
        isRoom || (this.createRoom() && this.curRoom.addPlayer(player));
        this.players.push(player);

        res({
            CODE: CODE.OK,
            players: this.rooms[player.getRoom()].players.filter((element) => element != null),
            myInfo: player
        });

        this.broadcastRoom(player, SIG.JOIN_ROOM, {
            CODE: CODE.OK,
            msg: `player ${player.uuid} joined!`,
            player: player
        }, io);
    }

    removePlayer(player, io) {
        const room = this.rooms[player.getRoom()];
        const gameInfo = room.getGameInfo();
        const id = room.removePlayer(player);

        if (player.isAdmin) {
            const cPlayer = this.findPlayerById(id);
            if (!!cPlayer) {
                cPlayer.isAdmin = true;
                const cPlayerInRoom = room.players.find(element => !!element && element.uuid === cPlayer.uuid);
                !!cPlayerInRoom && (cPlayerInRoom.isAdmin = true);
            }
        }

        this.players[this.players.findIndex(element => !!element && element.uuid === player.uuid)] = null;
        this.broadcastRoom(player, SIG.EXIT_ROOM, {
            CODE: CODE.OK,
            msg: `player ${player.uuid} left the room.`,
            player: player
        }, io);

        if (gameInfo && (gameInfo.state === STATE.BEFORE_START || gameInfo.state === STATE.GAME_FINISHED)) {
            return;
        }

        gameInfo && gameInfo.sideDeque.add(gameInfo.hands[player.uuid]);
    }

    startGame(player, sig, res, io) {
        const room = player.isAdmin ? this.rooms[player.getRoom()] : null;
        const code = (room && room.headCount >= 2) ? CODE.OK : CODE.ERROR;
        res({CODE: code});

        if (code === CODE.ERROR)
            return;

        room.startGame(() => {
            this.broadcastHand(player, sig, io, code);

            this.startTurn(player, io);
        });
        this.players = this.players.filter((element) => element != null);
    }

    startTurn(player, io) {
        const room = this.rooms[player.getRoom()];
        const gameInfo = room.getGameInfo();
        if (!gameInfo)
            return;
        gameInfo.startTurn();

        this.broadcastRoom(player, SIG.YOUR_TURN, {
            CODE: CODE.OK,
            player: player
        }, io);
    }

    drawCard(player, res, io) {
        const room = this.rooms[player.getRoom()];
        const gameInfo = room.getGameInfo();
        if (!gameInfo) {
            res({
                CODE: CODE.ERROR
            });
            return;
        }
        const drawResult = gameInfo.draw();
        gameInfo.endTurn();

        res({
            CODE: CODE.OK,
            newCards: drawResult,
            yourHand: gameInfo.hands[player.uuid]
        });

        this.startTurn(player, io);
    }

    playCard(player, card, wish, res, io) {
        const room = this.rooms[player.getRoom()];
        const gameInfo = room.getGameInfo();
        const isIllegal = checker.isIllegal(gameInfo.curCard, card, gameInfo.hands[player.uuid]);

        if (isIllegal) {
            res({CODE: CODE.ERROR});
        } else {
            gameInfo.playCard(card, wish);
            res({CODE: CODE.OK});
            this.broadcastHand(player, SIG.USE_RESULT, io, CODE.OK);
            this.checkWin(gameInfo, player, io);
        }

        this.startTurn(player, io);
    }

    broadcastRoom(curPlayer, sig, res, io) {
        const room = this.rooms[curPlayer.getRoom()];
        room.players.forEach(element => {
            !!element && io.to(element.id).emit(sig, res);
        });
    }

    broadcastHand(curPlayer, sig, io, code) {
        const room = this.rooms[curPlayer.getRoom()];
        const gameInfo = room.getGameInfo();
        room.players.forEach(element => {
            !!element && io.to(element.id).emit(sig, {
                CODE: code,
                currentCard: gameInfo ? gameInfo.curCard : null,
                yourHand: gameInfo ? gameInfo.hands[element.uuid] : null
            });
        });
    }

    findPlayerById(id) {
        return this.players.find(element => !!element && element.id === id);
    }

    checkWin(gameInfo, curPlayer, io) {
        if (!gameInfo.validPlayers[gameInfo.curTurn]) {
            this.broadcastRoom(curPlayer, SIG.SOMEONE_WIN, {
                CODE: CODE.OK,
                player: curPlayer
            }, io);
            if (gameInfo.state === STATE.GAME_FINISHED) {
                this.broadcastRoom(curPlayer, SIG.END_GAME, {
                    CODE: CODE.OK
                }, io);
            }
        }
    }
}

module.exports = GameManager;