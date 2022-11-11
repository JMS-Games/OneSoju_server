const VALUE = {
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    10: '10',
    11: 'J',
    12: 'Q',
    13: 'K',
    14: 'JOKER'
};

const SHAPE = {
    0: 'SPADE',
    1: 'DIAMOND',
    2: 'HEART',
    3: 'CLOVER'
};

const ATK = {
    1: '3',
    2: '2',
    3: '-1',
    4: '0',
    5: '0',
    6: '0',
    7: '0',
    8: '0',
    9: '0',
    10: '0',
    11: '0',
    12: '0',
    13: '0',
    14: '10'
}

Object.freeze(VALUE);
Object.freeze(SHAPE);
Object.freeze(ATK);

class Card {
    constructor(id, value, shape) {
        this.id = id;
        this.value = VALUE[value];
        this.shape = SHAPE[shape];
        this.atk = ATK[value];
    }
}

module.exports = Card;