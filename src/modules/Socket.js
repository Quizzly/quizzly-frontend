import Api from './Api';
import {browserHistory} from 'react-router';
var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');
var io = sailsIOClient(socketIOClient);


io.sails.url = Api.baseUrl;
console.log('io.sails.url', io.sails.url);
module.exports = {
    subscribeToSections: function() {
        io.socket.on('question', function gotQuestion (data) {
            browserHistory.push('/s/answer/'+data.questionKey);
        });
        return io.socket.get('/section/connect');
    }
};