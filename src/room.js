const GameInfo = require('./gameinfo');

class Room {
    constructor(id) {
        this.id = id;
        this.players = [];
        this.headCount = 0;
        this.isValid = true;
        this.gameInfo = null;
    }

    addPlayer(player) {
        if (this.headCount < 4) {
            player.setRoom(this.id, this.headCount === 0);

            this.headCount += 1;
            this.players.push(player);
            return true;
        }
        this.isValid = false;
        return false;
    }

    removePlayer(target_player) {
        let retPlayerId = -1;

        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i] === null)
                continue;

            if (this.players[i].uuid === target_player.uuid) {
                this.gameInfo && (this.gameInfo.headCount -= 1);
                this.headCount -= 1;
                this.players[i] = null;
            }
            else if (retPlayerId === -1)
                retPlayerId = this.players[i].id;
        }

        return retPlayerId;
    }

    getIsValid() {
        return this.isValid;
    }

    getGameInfo() {
        return this.gameInfo;
    }

    startGame(cb) {
        this.players = this.players.filter((element) => element != null);
        this.isValid = false;

        this.gameInfo = new GameInfo(this.players);
        this.gameInfo.gamePrepareSeq(cb);
    }
}

module.exports = Room;