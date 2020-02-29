'use strict'

const CONFIG = require('config');
const SERVER = require("socket.io").listen(CONFIG.get('port'));
const USER_MODEL = require("../models/user");
const CONNECT_MODEL = require("../forms/connect");
const UTILS = require('utils')._ ;


function logUser(user , text ){
    console.info(`[${user.socket().id}][${user.username}]:${text}`);
}

function log(socket , text ){
    if(USER_MODEL.isSocketInList(socket)){
        logUser(USER_MODEL.getBySocketFromList(socket) , text);
    }
    else{
        console.info(`[${socket.id}]:${text}`);
    }
}

function disconnect(socket , text , validator){
    log(socket, text);
    if(!UTILS.isEmpty(validator)){
        log(socket, JSON.stringify(validator.errors()));
        socket.emit("alert", JSON.stringify(validator.errors()));
    }
    return socket.disconnect();
}


SERVER.on("connection", (socket) => {

    log(socket,'Client connected');

    log(socket,'handshake check');
    let connection = CONNECT_MODEL.load(socket.handshake);
    if(!connection.validate()  ){
        return disconnect(socket,'handshake failed', connection);
    }


    log(socket,`session check`);
    let user = USER_MODEL.load(socket.handshake.query,socket);
    if(!user.validate() ){
        return disconnect(socket,'session failed', user);
    }

    log(socket,'user check');
    USER_MODEL.auth(user)
        .then(function(auth_result){
            if(auth_result){
                log(socket,'user exist');
                afterLogin(user);
            }else{
                log(socket,'user not existed');
                if(CONFIG.get('user.allow_new')){
                    log(socket,'creating user');
                    user.save()
                        .then(function(){
                            log(socket,'user created');
                            afterLogin(user);
                        }).catch(function (response) {
                        disconnect(socket,response,user);
                    });

                }else{
                    disconnect(socket,'user check failed');
                }

            }
    });


    socket.on("disconnect", () => {
        log(socket,'user disconnected');
        USER_MODEL.forgetSocket(socket);
    });

    socket.on("getSetting", (plannet) => {
        console.info(plannet);
        socket.emit("gotSetting", JSON.stringify({'seed':123}));
    });


});


function afterLogin(user){
    USER_MODEL.addUserToList(user);
    logUser(user,`Is ready`);

    user.socket().emit("user", JSON.stringify(user.data()));
}

// setInterval(() => {
// }, 10);

