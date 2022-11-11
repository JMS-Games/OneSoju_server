const Deque = require('./deque');
const STATE = require('./state');

class GameInfo {
    constructor(players) {
        this.headCount = players.length;
        this.players = players;
        this.hands = {};
        this.initHands();

        this.curTurn = 0;
        this.curCard = null;
        this.state = STATE.BEFORE_START;

        this.sideDeque = new Deque();
        this.sideDeque.makeEmpty();

        this.deque = new Deque();
        this.deque.shuffle();
    }

    initHands() {
        for (const player in this.players) {
            this.hands[player.uuid] = [];
        }
    }

    gamePrepareSeq() {
        this.state = STATE.PREPARING;
        this.curCard = this.deque.draw();

        for (let i = 0; i < 7; i++) {
            for (const player in this.players) {
                this.hands[player.uuid].push(this.deque.draw());
            }
        }
    }

    getInstance() {
        return this;
    }
}

module.exports = GameInfo;