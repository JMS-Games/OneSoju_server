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

Object.freeze(VALUE);
Object.freeze(SHAPE);

class Card {
    constructor(id, value, shape) {
        this.id = id;
        this.value = VALUE[value];
        this.shape = SHAPE[shape];
    }
}

module.exports = Card;