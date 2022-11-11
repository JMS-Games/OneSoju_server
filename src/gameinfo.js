const Deque = require('./deque');
const STATE = require('./state');
const CONFIG = require('./config');


class GameInfo {
    constructor(players) {
        this.headCount = players.length;
        this.players = players;
        this.hands = {};
        this.initHands();

        this.curTurn = 0;
        this.direction = CONFIG.DIRECTION.CLOCKWISE;
        this.curCard = null;
        this.state = STATE.BEFORE_START;

        this.sideDeque = new Deque();
        this.sideDeque.makeEmpty();

        this.deque = new Deque();
        this.deque.shuffle();
    }

    initHands() {
        for (const player of this.players) {
            this.hands[player.uuid] = [];
        }
    }

    gamePrepareSeq() {
        this.state = STATE.PREPARING;
        this.curCard = this.deque.draw();
        this.sideDeque.add(this.curCard);

        for (let i = 0; i < CONFIG.START_HAND[this.headCount]; i++) {
            for (const player of this.players) {
                this.hands[player.uuid].push(this.deque.draw());
            }
        }
    }

    getInstance() {
        return this;
    }
}

module.exports = GameInfo;