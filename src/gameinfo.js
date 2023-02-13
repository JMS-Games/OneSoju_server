const Deque = require('./deque');
const STATE = require('./state');
const CONFIG = require('./config');


class GameInfo {
    constructor(players) {
        this.headCount = players.length;
        this.players = players;
        this.players.forEach((player) => {
            player.setPlaying(true);
        });

        this.remainRank = 1;
        this.curTurn = 0;
        this.direction = CONFIG.DIRECTION.CLOCKWISE;
        this.curCard = null;
        this.state = STATE.BEFORE_START;
        this.curAtk = 1;

        this.sideDeque = new Deque();
        this.sideDeque.makeEmpty();

        this.deque = new Deque();
        this.deque.shuffle();
    }

    gamePrepareSeq(cb) {
        this.state = STATE.PREPARING;
        this.curCard = this.deque.draw();
        this.sideDeque.add(this.curCard);

        for (let i = 0; i < CONFIG.START_HAND[this.headCount]; i++) {
            this.players.forEach(player => {
                player.addHand(this.deque.draw());
            });
        }
        cb && cb();
    }

    startTurn() {
        this.state = STATE.TURN_START;
        this.players.forEach((player, index) => {
            if (index === this.curTurn)
                player.setTurn(true);
            else
                player.setTurn(false);
        });
    }

    playTurn(card, wish) {
        this.state = STATE.PLAYING;

        switch (card.type) {
            case CONFIG.CARD_TYPE.NORMAL: break;
            case CONFIG.CARD_TYPE.ATK:
                this.curAtk += card.atk; break;
            case CONFIG.CARD_TYPE.DEF:
                this.curAtk = 0; break;
            case CONFIG.CARD_TYPE.ANY:
                this.curCard.shape = CONFIG.SHAPE[wish.toString()];
                break;
            case CONFIG.CARD_TYPE.JUMP:
                do {
                    this.curTurn += this.direction;
                    this.curTurn %= this.headCount;
                } while(!this.players[this.curTurn].isPlaying()); break;
            case CONFIG.CARD_TYPE.BACK:
                this.direction *= -1; break;
            case CONFIG.CARD_TYPE.REPEAT:
                do {
                    this.curTurn -= this.direction;
                    this.curTurn %= this.headCount;
                } while (!this.players[this.curTurn].isPlaying()); break;
        }
    }

    endTurn() {
        this.state = STATE.TURN_END;
        do {
            this.curTurn += this.direction;
            this.curTurn %= this.headCount;
        } while (!this.players[this.curTurn].isPlaying());
    }

    draw() {
        const newCards = []
        while (this.curAtk > 0) {
            if (this.deque.getSize() <= 0) {
                this.deque.add(this.sideDeque).shuffle();
                this.sideDeque.makeEmpty();
            }

            const newCard = this.deque.draw();
            newCards.push(newCard);

            this.players[this.curTurn].addHand(newCard);
            this.curAtk -= 1;
        }
        this.curAtk = 1;
        return newCards;
    }

    playCard(card, wish) {
        this.sideDeque.add(this.curCard);
        this.curCard = card;

        const newHand = this.players[this.curTurn].hand.filter(element => element.id !== card.id);
        this.players[this.curTurn].refreshHand(newHand);
        this.playTurn(card, wish);

        if (this.players[this.curTurn].leftHand === 0) {
            this.players[this.curTurn].setPlaying(false);
            this.players[this.curTurn].setRank(this.remainRank++);
            if (this.remainRank === 4) {
                this.endGame();
            }
        }

        this.endTurn();
    }

    endGame() {
        this.state = STATE.GAME_FINISHED;
    }
}

module.exports = GameInfo;