class Player {
    constructor(id, uuid) {
        this.id = id;
        this.uuid = uuid;
        this.roomID = null;
        this.isAdmin = false;
        this.hand = [];
        this.leftHand = 0;
        this.rank = -1;
        this.onPlaying = false;
        this.isTurn = false;
    }

    setRoom(room, isFirst) {
        this.roomID = room;
        this.isAdmin = isFirst;
    }

    getRoom() {
        return this.roomID;
    }

    addHand(card) {
        this.hand.push(card);
        this.leftHand += 1;
    }

    refreshHand(hand) {
        this.hand = hand;
        this.leftHand = hand.length;
    }

    setPlaying(bool) {
        this.onPlaying = bool;
    }

    isPlaying() {
        return this.onPlaying;
    }

    setRank(rank) {
        this.rank = rank;
    }

    setTurn(isTurn) {
        this.isTurn = isTurn;
    }
}

module.exports = Player;