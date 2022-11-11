const Deque = require('./deque');
const STATE = require('./state');

class GameInfo {
    constructor(players) {
        this.headCount = players.length;
        this.hands = {};
        this.initHands(players);

        this.curTurn = 0;
        this.curCard = null;
        this.state = STATE.BEFORE_START;

        this.sideDeque = new Deque();
        this.sideDeque.makeEmpty();

        this.deque = new Deque();
        this.deque.shuffle();
    }

    initHands(players) {
        for (const player in players) {
            this.hands[player.uuid] = [];
        }
    }

    getInstance() {
        return this;
    }
}

module.exports = GameInfo;