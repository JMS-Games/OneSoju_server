const GameManager = (function() {
    let instance;

    function init() {
        return {
            createRoom: function() {
                if (this.curRoom && this.curRoom.getIsValid()) {
                    return false;
                }
                const tmpRoom = new Room();
                this.rooms.append(tmpRoom);
                this.curRoom = tmpRoom;
                return true;
            },

            addPlayer: function(player) {
                const ok = this.curRoom.addPlayer(player);
                ok || this.createRoom() && this.curRoom.addPlayer(player);
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
