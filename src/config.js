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

    CARD: {
        NORMAL: 0,
        ATK: 1,
        DEF: 2,
        ANY: 3,
        JUMP: 4,
        BACK: 5,
        REPEAT: 6
    }
};

Object.freeze(CONFIG);

module.exports = CONFIG;