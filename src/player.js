class Player {
    constructor(id, uuid) {
        this.id = id;
        this.uuid = uuid;
        this.roomID = null;
        this.isAdmin = false;
        this.hand = [];
        this.leftHand = 0;
        this.rank = -1;
    }

    setRoom(room, isFirst) {
        this.roomID = room;
        this.isAdmin = isFirst;
    }

    getRoom() {
        return this.roomID;
    }

    refreshHand(hand) {
        this.hand = hand;
        this.leftHand = hand.length;
    }
}

module.exports = Player;