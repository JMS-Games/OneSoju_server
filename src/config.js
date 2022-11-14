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
        JUMP: 3,
        BACK: 4,
        REPEAT: 5
    }
};

Object.freeze(CONFIG);

module.exports = CONFIG;