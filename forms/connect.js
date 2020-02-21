const VALIDATOR = require('validatorjs');

const RULES = {
    query: 'required'
};

module.exports = class CONNECT{

    constructor(query){
        this._validator;
        this.query = query;
    }
    validate(){
        this._validator = new VALIDATOR(this, RULES);
        return this._validator.passes();
    }

    errors(){
        return this._validator.errors;
    }

    static load(data){
        return new CONNECT(data.query);
    }

    data(){
        return {
            "query" : this.query,
        }

    }

}