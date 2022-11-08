class Deque {
    constructor() {
        this.queue = [];
        this.size = 54;
        for(let i=0;i < 52;i++) {
            this.queue.append(new Card(i, i % 14, (i / 14).toFixed()))
        }
        // append JOKER
        this.queue.append(new Card(52, 14, 0));
        this.queue.append(new Card(53, 14, 1));
    }

    getSize() {
        return this.size;
    }

    shuffle() {
        this.queue.sort(() => Math.random() - 0.5);
    }
}