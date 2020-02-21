'use strict';
const IOREDIS = require('ioredis');

/**
 * Variable to store singleton connect to redis
 * @private
 */
let _connect = null;

module.exports = class RedisDriver {

    /**
     * Return connect to redis
     * should not be used
     * created only for testing purposes
     * @private
     * @returns {Object} connection to redis instance via ioredis
     **/
    static connection() {
        return _connect;
    }

    /**
     * Arguments transformations for hmset function
     *  allows to pass arguments as object
     * should not be used directly
     * created only for testing purposes
     * @private
     * @returns {Object} Object of function arguments
     **/
    static ArgumentsTransformerHmset(args) {
        if (args.length === 2) {
            const key = args.shift();
            let newArgs = [key];
            const keys = Object.keys(args[0]);
            keys.map(function (val) {
                newArgs.push(val);
                newArgs.push(args[0][val]);
            });
            return newArgs;
        } else {
            return args;
        }
    }

    /**
     * Makes connect to redis and sets arguments transformations
     * should not be used directly
     * created only for testing purposes
     * @private
     **/

    /* istanbul ignore next */
    static connect() {
        _connect = new IOREDIS();
        IOREDIS.Command.setArgumentTransformer('hmset', RedisDriver.ArgumentsTransformerHmset);
    }

    /**
     * Makes singleton connect to redis
     * @public
     * @returns {Object} connection to redis instance via ioredis
     **/
    static getConnect() {
        /* istanbul ignore next */
        /** no way of testing this without running redis **/
        if (!RedisDriver.connection()) {
            RedisDriver.connect();
        }
        return RedisDriver.connection();
    }

};