const SIG = {
    // client side
    REQUEST_MATCH: 1,
    START_GAME: 2,
    DRAW_CARD: 3,
    USE_CARD: 4,

    // server side
    JOIN_ROOM: 100,
    EXIT_ROOM: 200,
    YOUR_TURN: 300,
    USE_RESULT: 400,
    SOMEONE_WIN: 500
};

Object.freeze(SIG);

module.exports = SIG;