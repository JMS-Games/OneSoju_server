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

        // when current card is joker
        if (curCard.value === CONFIG.CARD_VALUE.JOKER) {
            const shape = curCard.shape;
            if (shape === "DIAMOND" && (nextCard.shape === 'SPADE' || nextCard.shape === 'CLOVER')) {
                return true;
            }

            if (shape === "SPADE" && (nextCard.shape === 'DIAMOND' || nextCard.shape === 'HEART')) {
                return true;
            }

            return !(nextCard.value === CONFIG.CARD_VALUE["3"] || nextCard.value === CONFIG.CARD_VALUE.JOKER);
        }

        // if atk is lower than cur card.
        if (nextCard.atk < curCard.atk) {
            return true;
        }

        // not match with shape or number
        return !(curCard.shape === nextCard.shape || curCard.value === nextCard.value);
    }
}

module.exports = Checker;