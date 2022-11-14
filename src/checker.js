const CONFIG = require('./config');

const Checker = (function(){
    let instance;

    function init() {
        return {
            isIllegal: function(curCard, nextCard, hand) {
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
    }

    return {
        getInstance: function() {
            if (instance) {
                return instance;
            }
            instance = init();
            return instance;
        }
    }
})();

module.exports = Checker;