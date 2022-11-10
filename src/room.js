class Room {
    constructor() {
        this.players = [];
        this.isInGame = false;
    }

    addPlayer(player) {
        this.players.append(player);
    }

    isValid() {
        return !this.isInGame;
    }
}
