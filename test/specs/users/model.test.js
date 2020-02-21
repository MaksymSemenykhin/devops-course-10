'use strict'

const assert = require('assert');
const sinon = require('sinon');
const UTILILY = require('utility');
const USER_MODEL = require("../../../models/user");
const USERS = require("../../fixtures/users.json");
const REDIS_DRIVER = require("../../../drivers/redis");

// const spy = sinon.spy();
// const mock = sinon.mock(REDIS_DRIVER);
// mock.expects("getConnect").never();
// mock.verify();

function getSocket(){
    return {id:UTILILY.randomString(32, 'asdasd')};
}

function successCheck(user, socket){
    assert.equal(typeof user.data().password , 'undefined' );
    assert.deepEqual(user.errors(), []);
    assert.deepEqual(user.socket(), socket);
}


describe('User model check: ', function() {
    it('Load user from data', function() {
        const socket = getSocket();
        const userIndex = 0;

        const user = USER_MODEL.load(USERS[userIndex],socket);

        assert.equal(user.data().username, USERS[userIndex].username );
        assert.notEqual(user.password, USERS[userIndex].password );
        successCheck(user, socket );
    });

    it('Load user from data without socket', function() {
        const userIndex = 0;

        const user = USER_MODEL.load(USERS[userIndex]);

        assert.equal(user, false);
    });

    it('Load user from data without username', function() {
        const socket = getSocket();
        const userIndex = 1;

        const user = USER_MODEL.load(USERS[userIndex],socket);

        assert.equal(user.data().username, null );
        assert.notEqual(user.password, USERS[userIndex].password );
        successCheck(user, socket );
    });

    it('Load user from data without password', function() {
        const socket = getSocket();
        const userIndex = 2;

        const user = USER_MODEL.load(USERS[userIndex],socket);

        assert.equal(user.data().username, USERS[userIndex].username );
        successCheck(user, socket );
    });

});