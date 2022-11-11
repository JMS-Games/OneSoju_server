const GameInfo = require('./gameinfo');

class Room {
    constructor() {
        this.players = [];
        this.headCount = 0;
        this.isVaild = true;
        this.gameInfo = null;
    }

    addPlayer(player) {
        if (this.headCount < 4) {
            if (this.headCount === 0) {
                player.setRoom(this, true);
            }

            this.headCount += 1;
            this.players.push({id: player.id, uuid: player.uuid});
            return true;
        }
        this.isVaild = false;
        return false;
    }

    removePlayer(target_player) {
        for(let i = 0; i < this.players.length; i++) {
            if (this.players[i].uuid === target_player.uuid) {
                this.gameInfo.headCount -= 1;
                this.headCount -= 1;
                this.players[i] = null;
                return;
            }
        }
    }

    getIsValid() {
        return this.isVaild;
    }

    getGameInfo() {
        return this.gameInfo.getInstance();
    }

    startGame() {
        this.gameInfo = new GameInfo(this.players);
        this.isVaild = false;
        this.gameInfo.gamePrepareSeq();
    }
}

module.exports = Room;