class Room {
    constructor() {
        this.players = [];
        this.isVaild = true;
        this.gameinfo = null;
    }

    addPlayer(player) {
        if (this.players.length < 4) {
            this.players.append(player);
            return true;
        }
        this.isVaild = false;
        return false;
    }

    getIsValid() {
        return this.isVaild;
    }

    getGameInfo() {
        return this.gameinfo;
    }

    startGame() {
        this.gameinfo = new GameInfo(this.players);
        this.isVaild = false;
    }
}
