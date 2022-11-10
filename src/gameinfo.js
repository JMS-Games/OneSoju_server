class GameInfo {
    constructor(players) {
        this.headcount = players.length;
        this.hands = [];
        this.deque = new Deque();

        this.deque.shuffle();
    }
}