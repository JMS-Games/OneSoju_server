const assert = require('assert');

const CODE = require('../src/code');

const GM = require('../src/gamemanager').getInstance();
const Player = require('../src/player');


describe('test4test', () => {
    /*
    before(() => {
        console.log('before test hook');
    });

    after(() => {
        console.log('after test hook');
    });

    beforeEach(() => {
        console.log('beforeEach hook');
    });

    afterEach(() => {
        console.log('afterEach hook');
    });
    */
    describe('Create Room Sequence Test', () => {
        it('Create Room', () => {
            assert.equal(GM.createRoom(), true);
        });

        it('Player1 Enter', () => {
            GM.addPlayer(new Player(0, 0), (result) => {
                assert.equal(result.CODE, CODE.OK);
            });
        });

        it('Player2 Enter', () => {
            GM.addPlayer(new Player(1, 1), (result) => {
                assert.equal(result.CODE, CODE.OK);
            });
        });

        it('Player3 Enter', () => {
            GM.addPlayer(new Player(2, 2), (result) => {
                assert.equal(result.CODE, CODE.OK);
            });
        });

        it('Player4 Enter', () => {
            GM.addPlayer(new Player(3, 3), (result) => {
                assert.equal(result.CODE, CODE.OK);
            });
        });

        it('Room Count Check expected 1', () => {
            assert.equal(GM.rooms.length, 1);
        });

        it('Player5 Enter', () => {
            GM.addPlayer(new Player(4, 4), (result) => {
                assert.equal(result.CODE, CODE.OK);
            });
        });

        it('Room Count Check expected 2', () => {
            assert.equal(GM.rooms.length, 2);
        });
    });
});