'use strict'


const io = require("socket.io-client");
const assert = require('assert');
let ioClient;
const host = 'localhost';
const port = 8000;

describe('Client', function () {
    this.timeout(50);

    it('should connect to server', (done) => {
        ioClient = io.connect(`http://${host}:${port}`,{
            query: {
                username: 'yaya',
                password: '123456'
            }
        });

        ioClient.on('user', (response) => {
            const userData = JSON.parse(response);

            assert.equal(userData.username,'yaya');

            done();
        })

        ioClient.on('alert', (response) => {
            const alertData = JSON.parse(response);
            // console.log(response);
            assert.equal(alertData.errors.username,'The username field is required.');
        })


    })


    it('should not connect without username', (done) => {
        ioClient = io.connect(`http://${host}:${port}`);

        ioClient.on('disconnect', () => {
            done()
        })

        ioClient.on('alert', (response) => {
            const alertData = JSON.parse(response);
            console.log(response);
            assert.equal(alertData.errors.username,'The username field is required.');
        })

    })


    afterEach(() => {

        ioClient.close()
        //         // this._http.close()
    })
})