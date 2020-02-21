const VALIDATOR = require('validatorjs');
const UTILILY = require('utility');
const UTILS = require('utils')._ ;
const REDIS_DRIVER = require('../../drivers/redis.js');
const NEW_ARRAY = require('associative-array');
const CONFIG = require('config');

const RULES = {
    username: 'required|string|max:40|min:4|alpha_dash',
    password: 'required|string|max:40|min:4',
};

const users = new NEW_ARRAY();

module.exports = class User{

    static isSocketInList(socket){

        if(UTILS.isEmpty(socket) || UTILS.isEmpty(socket.id)){
            return null;
        }

        return users.has(socket.id);
    }

    static getBySocketFromList(socket){

        if(!User.isSocketInList(socket)){
            return null;
        }

        return users.get(socket.id);
    }


    static isUserInList(user){

        if(UTILS.isEmpty(user) || typeof user.socket !== 'function'){
            return null;
        }

        return users.has(user.socket().id);
    }

    static users(){
        return users;
    }

    static addUserToList(user){

        if(User.isUserInList(user) === null){
            return false;
        }
        if(User.isUserInList(user) === false){
            return users.push(user.socket().id, user);
        }

        return true;
    }

    static forgetSocket(socket){

        if(UTILS.isEmpty(socket)){
            return true;
        }

        if(User.isSocketInList(socket)){
            return !UTILS.isEmpty(users.remove(socket.id));
        }
        return true;
    }

    /*
    @param {User} user
    @returns {Promise} array of one `username` field or empty array
    */
    static auth(user){
        return REDIS_DRIVER.getConnect().hmget(User.getKey(user),['username'])
            .then(function(auth_result){
                return !UTILS.isEmpty(auth_result.join());
            });
    }

    /*
    @returns {User} user model with filled by data fields
    */
    static load(data,socket){
        if(!socket)
            return false;
        return new User(data,socket);
    }

    static getKey(user){
        return `${CONFIG.get('env')}:user:${UTILILY.sha1(user.username)}`;
    }

    constructor(data,socket){
        this._validator = null;
        this._socket = socket;

        if(UTILILY.has(data, 'username') ){
            this.username = data.username;
        }
        if(UTILILY.has(data, 'password') ){
            this.password = UTILILY.sha1(data.password);
        }
    }

    validate(){
        this._validator = new VALIDATOR(this, RULES);

        return this._validator.passes();
    }
    socket(){
        return this._socket;
    }

    errors(){
        return this._validator ? this._validator.errors : [];
    }

    data(){
        return {
            "username" : this.username,
        };

    }

    save(validate = true){
        if(validate && !this.validate()){
            return new Promise(function(resolve, reject) {
                reject('Failed to save user');
            });
        }
        return REDIS_DRIVER.getConnect().hmset(User.getKey(this), {'username': this.data().username});
    }

};