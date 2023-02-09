const GameInfo = require('./gameinfo');

class Room {
    constructor() {
        this.players = [];
        this.headCount = 0;
        this.isValid = true;
        this.gameInfo = null;
    }

    addPlayer(player) {
        if (this.headCount < 4) {
            player.setRoom(this, this.headCount === 0);

            this.headCount += 1;
            this.players.push({id: player.id, uuid: player.uuid, isAdmin: player.isAdmin});
            return true;
        }
        this.isValid = false;
        return false;
    }

    removePlayer(target_player) {
        let retPlayerId = -1;
        if (this.players.length > 1 && this.players[1].id)
            retPlayerId = this.players[1].id;

        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i] === null)
                continue;

            if (this.players[i].uuid === target_player.uuid) {
                this.gameInfo && (this.gameInfo.headCount -= 1);
                this.headCount -= 1;
                this.players[i] = null;
                return retPlayerId;
            }
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