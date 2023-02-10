class Player {
    constructor(id, uuid) {
        this.id = id;
        this.uuid = uuid;
        this.room = null;
        this.isAdmin = false;
        this.hand = [];
        this.leftHand = 0;
        this.rank = -1;
    }

    setRoom(room, isFirst) {
        this.room = room;
        this.isAdmin = isFirst;
    }

    getRoom() {
        return this.room;
    }

    refreshHand(hand) {
        this.hand = hand;
        this.leftHand = hand.length;
    }
}

module.exports = Player;