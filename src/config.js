const CONFIG = {
    PORT: 3000,
    START_HAND: {
        2: 14,
        3: 9,
        4: 7
    },

    DIRECTION: {
        CLOCKWISE: 1,
        ANTI_CLOCKWISE: -1
    },

    CARD_TYPE: {
        NORMAL: 0,
        ATK: 1,
        DEF: 2,
        ANY: 3,
        JUMP: 4,
        BACK: 5,
        REPEAT: 6
    },

    CARD_VALUE: {
        'A': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        '10': 10,
        'J': 11,
        'Q': 12,
        'K': 13,
        'JOKER': 14
    }
};

Object.freeze(CONFIG);

module.exports = CONFIG;