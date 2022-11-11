const Card = require('./card');

class Deque {
    constructor() {
        this.queue = [];
        this.init();
        this.size = this.queue.length;
    }

    init() {
        for(let i=0;i < 52;i++) {
            this.queue.push(new Card(i, i % 14, (i / 14).toFixed()))
        }
        // push JOKER
        this.queue.push(new Card(52, 14, 0));
        this.queue.push(new Card(53, 14, 1));
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
        if (Array.isArray(card)) {
            for (const card_ in card) {
                this.queue.push(card_);
            }
            this.size += card.length;
        } else {
            this.queue.push(card);
            this.size += 1;
        }
    }

    draw() {
        if (this.size > 0) {
            this.size -= 1;
            return this.queue.pop();
        }
        return null;
    }
}

module.exports = Deque;