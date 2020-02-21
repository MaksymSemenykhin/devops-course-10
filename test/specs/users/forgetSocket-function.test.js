'use strict'

const assert = require('assert');
const UTILILY = require('utility');
const USER_MODEL = require("../../../models/user");
const USERS = require("../../fixtures/users.json");


function getSocket(){
    return {id:UTILILY.randomString(32, 'asdasd')};
}
const defSocket = getSocket();


describe('User forgetSocket function check: ', function() {

    beforeEach(function(done){
        USER_MODEL.users().reset();
        done();
    });

    it('Check forgetSocket with no users ', function() {
        assert.equal(USER_MODEL.forgetSocket(defSocket) , true );
        assert.equal(USER_MODEL.users().length, 0 );
    });

    it('Check forgetSocket without socket ', function() {
        assert.equal(USER_MODEL.forgetSocket() , true );
        assert.equal(USER_MODEL.users().length, 0 );
    });

    it('Check forgetSocket with couple users ', function() {

        const sockets = [getSocket(),getSocket()];
        const userIndexs = [0,3];

        const users = [
            USER_MODEL.load(USERS[userIndexs[0]],sockets[0]),
            USER_MODEL.load(USERS[userIndexs[1]],sockets[1])
        ];

        USER_MODEL.addUserToList(users[0]);
        USER_MODEL.addUserToList(users[1]);

        assert.equal(USER_MODEL.forgetSocket(sockets[0]) , true );
        assert.equal(USER_MODEL.forgetSocket(sockets[1]) , true );
        assert.equal(USER_MODEL.users().length, 0 );
    });


});