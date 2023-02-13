const assert = require('assert');

const CODE = require('../src/code');
const SIG = require('../src/signal');

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const GameManager = require('../src/gamemanager');
const GM = new GameManager();
const Player = require('../src/player');


describe('Unit Test Sequence', () => {
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

    const p1 = new Player(0, 0);
    const p2 = new Player(1, 1);
    const p3 = new Player(2, 2);
    const p4 = new Player(3, 3);
    const p5 = new Player(4, 4);
    const p6 = new Player(5, 5);
    const p7 = new Player(6, 6);

    describe('Create Room Sequence Test', () => {
        it('Player1 Enter(Create Room)', () => {
            GM.addPlayer(p1, (result) => {
                assert.equal(result.CODE, CODE.OK);
            }, io);
        });

        it('Player2 Enter', () => {
            GM.addPlayer(p2, (result) => {
                assert.equal(result.CODE, CODE.OK);
            }, io);
        });

        it('Player3 Enter', () => {
            GM.addPlayer(p3, (result) => {
                assert.equal(result.CODE, CODE.OK);
            }, io);
        });

        it('Player4 Enter', () => {
            GM.addPlayer(p4, (result) => {
                assert.equal(result.CODE, CODE.OK);
            }, io);
        });

        it('Room Count Check expected 1', () => {
            assert.equal(Object.keys(GM.rooms).length, 1);
        });

        it('Room 1 Admin Id expected 0', () => {
            const p = GM.rooms[p1.getRoom()].players.find(element => !!element && GM.findPlayerById(element.id).isAdmin);
            assert.equal(p.id, 0);
        });

        it('Player1(Admin) Left', () => {
            GM.removePlayer(p1, io);
        });

        it('Room 1 Admin Id expected 1 now', () => {
            const p = GM.rooms[p2.getRoom()].players.find(element => !!element && GM.findPlayerById(element.id).isAdmin);
            assert.equal(p.id, 1);
        });

        it('Player5 Enter', () => {
            GM.addPlayer(p5, (result) => {
                assert.equal(result.CODE, CODE.OK);
            }, io);
        });

        it('Room Count Check expected 1 again', () => {
            assert.equal(Object.keys(GM.rooms).length, 1);
        });

        it('Player6 Enter', () => {
            GM.addPlayer(p6, (result) => {
                assert.equal(result.CODE, CODE.OK);
            }, io);
        });

        it('Room Count Check expected 2 now', () => {
            assert.equal(Object.keys(GM.rooms).length, 2);
        });
    });

    describe('Game Starting Sequence Test on 4 players', () => {
        it('Game Start on Room 1 by player2', () => {
            GM.startGame(p2, SIG.START_GAME, (result) => {
                assert.equal(result.CODE, CODE.OK);
            }, io);
        });

        it('get Current Room GameInfo by player2', () => {
            assert(GM.rooms[p2.getRoom()].getGameInfo());
            console.log(GM.rooms[p2.getRoom()].getGameInfo());
        });

        it('player2 draw card.', () => {
            GM.drawCard(p2, (result) => {
                assert.equal(result.CODE, CODE.OK);
                console.log("newCard!:", result.newCards);
            }, io);
        });

        it(`now player2's isTurn is false and player3's isTurn is true`, () => {
           assert.equal(!p2.isTurn && p3.isTurn, true);
        });
    });

    describe('Game Starting Sequence Test on 2 players', () => {
        it('Player7 Enter(in Room2(Admin = p6))', () => {
            GM.addPlayer(p7, (result) => {
                assert.equal(result.CODE, CODE.OK);
            }, io);
        });

        it('player7 try to start the game = fail', () => {
            GM.startGame(p7, SIG.START_GAME, (result) => {
                assert.equal(result.CODE, CODE.ERROR);
            }, io);
        });

        it('player6 try to start the game = success', () => {
            GM.startGame(p6, SIG.START_GAME, (result) => {
                assert.equal(result.CODE, CODE.OK);
            }, io);
        });
    });
});