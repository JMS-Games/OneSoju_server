const STATE = {
    BEFORE_START: 0,
    PREPARING: 1,
    TURN_START: 2,
    PLAYING: 3,
    TURN_END: 4,
    GAME_FINISHED: 5,
};

Object.freeze(STATE);

export class GameInfo {
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