export class Deque {
    constructor() {
        this.queue = [];
        this.init();
        this.size = this.queue.length;
    }

    init() {
        for(let i=0;i < 52;i++) {
            this.queue.append(new Card(i, i % 14, (i / 14).toFixed()))
        }
        // append JOKER
        this.queue.append(new Card(52, 14, 0));
        this.queue.append(new Card(53, 14, 1));
    }

    makeEmpty() {
        this.queue = [];
        this.size = 0;
    }

    getSize() {
        return this.size;
    }

    shuffle() {
        this.queue.sort(() => Math.random() - 0.5);
    }

    add(card) {
        this.queue.append(card);
        this.size += 1;
    }
}