const CODE = require("./code");

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

            addPlayer: function(player, res) {
                const ok = this.curRoom ? this.curRoom.addPlayer(player) : false;
                ok || this.createRoom() && this.curRoom.addPlayer(player);
                res({
                    CODE: CODE.OK,
                    room: this.curRoom
                });
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

module.exports = GameManager;