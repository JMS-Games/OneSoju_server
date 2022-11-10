class Room {
    constructor() {
        this.players = [];
        this.isVaild = true;
        this.gameInfo = null;
    }

    addPlayer(player) {
        if (this.players.length < 4) {
            this.players.append(player);
            return true;
        }
        this.isVaild = false;
        return false;
    }

    removePlayer(target_player) {
        for(let i = 0; i < this.players.length; i++) {
            if (this.players[i].uuid === target_player.uuid) {
                this.gameInfo.headcount -= 1;
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
    }
}
