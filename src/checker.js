const CONFIG = require('./config');

class Checker {
    constructor() {

    }

    isIllegal(curCard, nextCard, hand) {
        // nextCard isn't in your hand
        if (!hand.find((element) => element.id === nextCard.id)) {
            console.log('[Checker][ERROR] request error! hand: 404');
            return true;
        }

        // not match with shape or number
        if (!(curCard.shape === nextCard.shape || curCard.value === nextCard.value)) {
            return true;
        }

        return false;
    }
}

module.exports = Checker;