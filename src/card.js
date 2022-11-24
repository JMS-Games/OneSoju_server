const CONFIG = require('./config');

const TYPE = {
    1: CONFIG.CARD_TYPE.ATK,
    2: CONFIG.CARD_TYPE.ATK,
    3: CONFIG.CARD_TYPE.DEF,
    4: CONFIG.CARD_TYPE.NORMAL,
    5: CONFIG.CARD_TYPE.NORMAL,
    6: CONFIG.CARD_TYPE.NORMAL,
    7: CONFIG.CARD_TYPE.ANY,
    8: CONFIG.CARD_TYPE.NORMAL,
    9: CONFIG.CARD_TYPE.NORMAL,
    10: CONFIG.CARD_TYPE.NORMAL,
    11: CONFIG.CARD_TYPE.JUMP,
    12: CONFIG.CARD_TYPE.BACK,
    13: CONFIG.CARD_TYPE.REPEAT,
    14: CONFIG.CARD_TYPE.ATK
};

Object.freeze(TYPE);

class Card {
    constructor(id, value, shape) {
        this.id = id;
        this.value = CONFIG.VALUE[value];
        this.shape = CONFIG.SHAPE[shape];
        this.type = TYPE[value];
        this.atk = CONFIG.ATK[value];
    }
}

module.exports = Card;