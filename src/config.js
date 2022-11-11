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
    }
};

Object.freeze(CONFIG);

module.exports = CONFIG;