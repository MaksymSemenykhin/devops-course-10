'use strict'

const assert = require('assert');
const sinon = require('sinon');
const UTILILY = require('utility');
const USER_MODEL = require("../../../models/user");
const USERS = require("../../fixtures/users.json");
const REDIS_DRIVER = require("../../../drivers/redis");
const PROMISE_TOOLS = require("promise-tools");


function getSocket(){
    return {id:UTILILY.randomString(32, 'asdasd')};
}
const defSocket = getSocket();


describe('User auth function check: ', function() {

    beforeEach(function(done){

        PROMISE_TOOLS.parallel([
            ()=>USER_MODEL.load(USERS[0],defSocket).save(),
        ]).then(function() {
            done();
        });

    });

    it('Trying to auth with new user ', function(){
        const USER = USER_MODEL.load(USERS[4],defSocket);

        USER_MODEL.auth(USER)
            .then(function(auth_result){
                assert.equal(auth_result, false );
            });

    });


    it('Trying to auth with existed user ', function(){
        const USER = USER_MODEL.load(USERS[0],defSocket);

        USER_MODEL.auth(USER)
            .then(function(auth_result){
                assert.equal(auth_result, true );
            });

    });

    after(function(){
        REDIS_DRIVER.getConnect().disconnect();
    });

});