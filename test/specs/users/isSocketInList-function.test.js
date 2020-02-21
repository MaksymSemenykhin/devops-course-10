'use strict'

const assert = require('assert');
const sinon = require('sinon');
const UTILILY = require('utility');
const USER_MODEL = require("../../../models/user");
const USERS = require("../../fixtures/users.json");
const REDIS_DRIVER = require("../../../drivers/redis");


function getSocket(){
    return {id:UTILILY.randomString(32, 'asdasd')};
}
const defSocket = getSocket();


describe('User isSocketInList function check: ', function() {

    beforeEach(function(done){
        USER_MODEL.users().reset();
        done();
    });


    it('Check isSocketInList with new socket', function() {
        assert.equal(USER_MODEL.isSocketInList(defSocket) , false );
    });

    it('Check isSocketInList with existed user', function() {
        const userIndex = 0;
        const user = USER_MODEL.load(USERS[userIndex],defSocket);
        USER_MODEL.addUserToList(user);

        assert.equal(USER_MODEL.isSocketInList(defSocket) , true );
        assert.equal(USER_MODEL.users().length, 1 );
    });

    it('Check isSocketInList with couple same users', function() {
        const userIndex = 0;
        const user = USER_MODEL.load(USERS[userIndex],defSocket);

        USER_MODEL.addUserToList(user);
        USER_MODEL.addUserToList(user);

        assert.equal(USER_MODEL.isSocketInList(defSocket) , true );
        assert.equal(USER_MODEL.users().length, 1 );
    });

    it('Check isSocketInList with non user data', function() {

        assert.equal(USER_MODEL.addUserToList(1) , false );
        assert.equal(USER_MODEL.isSocketInList() , null );
        assert.equal(USER_MODEL.users().length, 0 );
    });


});