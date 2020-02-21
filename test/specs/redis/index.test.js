'use strict'

const assert = require('assert');
// const sinon = require('sinon');
// const UTILILY = require('utility');
// const USER_MODEL = require("../../../models/user");
// const USERS = require("../../fixtures/users.json");
const REDIS_DRIVER = require("../../../drivers/redis");
const SINON = require('sinon');
const MOCK = SINON.mock(REDIS_DRIVER);

// const spy = sinon.spy();
// const mock = sinon.mock(REDIS);
// mock.restore();
// mock.expects("getConnect").once();
//
//
// function getSocket(){
//     return {id:UTILILY.randomString(32, 'asdasd')};
// }
//
// function successCheck(user, socket){
//     assert.equal(typeof user.data().password , 'undefined' );
//     assert.deepEqual(user.errors(), []);
//     assert.deepEqual(user.socket(), socket);
// }


describe('redis driver check: ', function() {
    it('connection should be null', function() {
        MOCK.expects("getConnect").never();

        assert.equal(REDIS_DRIVER.connection(), null );
        MOCK.verify();
    });

    it('should connect ', function() {
        MOCK.expects("connect").once();
        REDIS_DRIVER.getConnect();

        MOCK.verify();
    });

    // it('Load user from data without socket', function() {
    //     const userIndex = 0;
    //
    //     const user = USER_MODEL.load(USERS[userIndex]);
    //
    //     assert.equal(user, false);
    // });
    //
    // it('Load user from data without username', function() {
    //     const socket = getSocket();
    //     const userIndex = 1;
    //
    //     const user = USER_MODEL.load(USERS[userIndex],socket);
    //
    //     assert.equal(user.data().username, null );
    //     assert.notEqual(user.password, USERS[userIndex].password );
    //     successCheck(user, socket );
    // });
    //
    // it('Load user from data without password', function() {
    //     const socket = getSocket();
    //     const userIndex = 2;
    //
    //     const user = USER_MODEL.load(USERS[userIndex],socket);
    //
    //     assert.equal(user.data().username, USERS[userIndex].username );
    //     successCheck(user, socket );
    // });

});