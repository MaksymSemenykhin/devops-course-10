'use strict';

const assert = require('assert');
const REDIS_DRIVER = require("../../../drivers/redis");


describe('redis driver ArgumentsTransformerHmset function check: ', function () {

    it('ArgumentsTransformerHmset converts key plus data objects  ', function () {

        const resultArguments = REDIS_DRIVER.ArgumentsTransformerHmset(['set', {
            'key1': 'value1',
            'key2': 'value2'
        }])

        assert.deepEqual(resultArguments, ['set', 'key1', 'value1', 'key2', 'value2']);
    });


    it('ArgumentsTransformerHmset should not converts key without data objects  ', function () {

        const resultArguments = REDIS_DRIVER.ArgumentsTransformerHmset(['set']);

        assert.deepEqual(resultArguments, ['set']);
    });

});