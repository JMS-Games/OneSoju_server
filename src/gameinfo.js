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
        this.curPlayer = null;
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
        const tmpCard = this.deque.draw();
        this.curCard = tmpCard;
        this.sideDeque.add(tmpCard);

        for (let i = 0; i < CONFIG.START_HAND[this.headCount]; i++) {
            this.players.forEach(player => {
                const drawCard = this.deque.draw();
                player.addHand(drawCard);
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
        this.curPlayer = this.players[this.curTurn];
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
                } while(!this.curPlayer.isPlaying()); break;
            case CONFIG.CARD_TYPE.BACK:
                this.direction *= -1; break;
            case CONFIG.CARD_TYPE.REPEAT:
                do {
                    this.curTurn -= this.direction;
                    this.curTurn %= this.headCount;
                } while (!this.curPlayer.isPlaying()); break;
        }
    }

    endTurn() {
        this.state = STATE.TURN_END;
        do {
            this.curTurn += this.direction;
            this.curTurn %= this.headCount;
        } while (!this.curPlayer.isPlaying());
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

            this.curPlayer.addHand(newCard);
            this.curAtk -= 1;
        }
        this.curAtk = 1;
        return newCards;
    }

    playCard(card, wish) {
        this.sideDeque.add(card);
        this.curCard = card;

        const newHand = this.curPlayer.hand.filter(element => element.id !== card.id);
        this.curPlayer.refreshHand(newHand);
        this.playTurn(card, wish);

        if (this.curPlayer.leftHand === 0) {
            this.curPlayer.setPlaying(false);
            this.curPlayer.setRank(this.remainRank++);
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