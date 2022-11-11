const STATE = {
    BEFORE_START: 0,
    PREPARING: 1,
    TURN_START: 2,
    PLAYING: 3,
    TURN_END: 4,
    GAME_FINISHED: 5,
};

Object.freeze(STATE);

module.exports = STATE;