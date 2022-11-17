const assert = require('assert');

const CODE = require('../src/code');
const SIG = require('../src/signal');

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const SocketManager = require('../src/socket');
const socketManager = new SocketManager(io);

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

    describe('Create Room Sequence Test', () => {
        it('Player1 Enter(Create Room)', () => {
            GM.addPlayer(p1, (result) => {
                assert.equal(result.CODE, CODE.OK);
            });
        });

        it('Player2 Enter', () => {
            GM.addPlayer(p2, (result) => {
                assert.equal(result.CODE, CODE.OK);
            });
        });

        it('Player3 Enter', () => {
            GM.addPlayer(p3, (result) => {
                assert.equal(result.CODE, CODE.OK);
            });
        });

        it('Player4 Enter', () => {
            GM.addPlayer(p4, (result) => {
                assert.equal(result.CODE, CODE.OK);
            });
        });

        it('Room Count Check expected 1', () => {
            assert.equal(GM.rooms.length, 1);
        });

        it('Room 1 Admin Id expected 0', () => {
            const p = GM.rooms[0].players.find(element => GM.findPlayerById(element.id).isAdmin);
            assert.equal(p.id, 0);
        });

        it('Player1(Admin) Left', () => {
            GM.removePlayer(p1);
        });

        it('Room 1 Admin Id expected 1 now', () => {
            const p = GM.rooms[0].players.find(element => element && GM.findPlayerById(element.id).isAdmin);
            assert.equal(p.id, 1);
        });

        it('Player5 Enter', () => {
            GM.addPlayer(p5, (result) => {
                assert.equal(result.CODE, CODE.OK);
            });
        });

        it('Room Count Check expected 1 again', () => {
            assert.equal(GM.rooms.length, 1);
        });

        it('Player6 Enter', () => {
            GM.addPlayer(p6, (result) => {
                assert.equal(result.CODE, CODE.OK);
            });
        });

        it('Room Count Check expected 2 now', () => {
            assert.equal(GM.rooms.length, 2);
        });
    });

    describe('Game Starting Sequence Test', () => {
        it('Game Start on Room 1 by player2', () => {
            GM.startGame(p2, SIG.START_GAME, (result) => {
                assert.equal(result.CODE, CODE.OK);
            }, socketManager.getIo());
        });
    });
});