class Room {
    constructor() {
        this.players = [];
        this.isVaild = true;
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

    startGame() {
        this.isVaild = false;
    }
}
