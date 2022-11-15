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
        this.curAtk = 0;

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

    startTurn() {
        this.state = STATE.TURN_START;
        if (this.curAtk > 0) {
            // todo under atk
        }
    }

    playTurn(card) {
        this.state = STATE.PLAYING;

        switch (card.type) {
            case CONFIG.CARD_TYPE.NORMAL: break;
            case CONFIG.CARD_TYPE.ATK:
                this.curAtk += card.atk; break;
            case CONFIG.CARD_TYPE.DEF:
                this.curAtk = 0; break;
            case CONFIG.CARD_TYPE.ANY:
                // todo card 7
                break;
            case CONFIG.CARD_TYPE.JUMP:
                this.curTurn += this.direction;
                this.curTurn %= this.headCount; break;
            case CONFIG.CARD_TYPE.BACK:
                this.direction *= -1; break;
            case CONFIG.CARD_TYPE.REPEAT:
                this.curTurn -= this.direction;
                this.curTurn %= this.headCount; break;
        }
    }

    endTurn() {
        this.state = STATE.TURN_END;
        this.curTurn += this.direction;
        this.curTurn %= this.headCount;
    }

    draw() {
        if (this.deque.getSize() <= 0) {
            this.deque.add(this.sideDeque).shuffle();
            this.sideDeque.makeEmpty();
        }

        this.hands[this.players[this.curTurn].uuid].push(this.deque.draw());
    }

    playCard(card) {
        this.sideDeque.add(this.curCard);
        this.curCard = card;

        const uuid = this.players[this.curTurn].uuid;
        this.hands[uuid] = this.hands[uuid].filter(element => element.id !== card.id);
        this.playTurn(card);

        if (this.hands[uuid].length === 0) {
            // todo remove player from game set
        }
    }

    endGame() {
        this.state = STATE.GAME_FINISHED;
    }
}

module.exports = GameInfo;