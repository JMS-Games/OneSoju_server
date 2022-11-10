const GameManager = (function() {
    let instance;

    function init() {
        return {
            createRoom: function() {
                if (this.curRoom && this.curRoom.isValid()) {
                    return;
                }
                const tmpRoom = new Room();
                this.rooms.append(tmpRoom);
                this.curRoom = tmpRoom;
            },

            curRoom: null,
            rooms: [],
        }
    }

    return {
        getInstance: function() {
            if (instance) {
                return instance;
            }
            instance = init();
            return instance;
        }
    }
})();
