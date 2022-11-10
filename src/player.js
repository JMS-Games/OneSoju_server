class Player {
    constructor(uuid) {
        this.uuid = uuid;
        this.room = null;
        this.isAdmin = false;
    }

    setRoom(room, isFirst) {
        this.room = room;
        this.isAdmin = isFirst;
    }

    getRoom() {
        return this.room;
    }
}