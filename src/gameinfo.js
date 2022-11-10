class GameInfo {
    constructor(players) {
        this.headcount = players.length;
        this.hands = [];

        this.curTurn = 0;
        this.curCard = null;

        this.sideDeque = new Deque();
        this.sideDeque.makeEmpty();

        this.deque = new Deque();
        this.deque.shuffle();
    }
}