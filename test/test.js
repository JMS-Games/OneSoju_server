const assert = require('assert');
const GM = require('../src/gamemanager').getInstance();

describe('test4test', () => {
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

    it('Create Room test', () => {
        assert.equal(GM.createRoom(), true);
    });
});