const SIG = {
    // client side
    REQUEST_MATCH: "1",
    START_GAME: "2",
    DRAW_CARD: "3",
    USE_CARD: "4",

    // server side
    JOIN_ROOM: "100",
    EXIT_ROOM: "200",
    YOUR_TURN: "300",
    HAND_INFO: "400",
    SOMEONE_WIN: "500",
    END_GAME: "600"
};

Object.freeze(SIG);

module.exports = SIG;