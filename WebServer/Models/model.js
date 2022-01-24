const EtherPortClient = require('etherport-client').EtherPortClient;
const { Board } = require('johnny-five');
const { connectionTimeout } = require('../Config/config');

let boards = {};

const connect = (ip) => {
    if (boards[ip]) {
        return new Promise((resolve, reject) => {
            resolve({ code: 400, message: 'Already connected to ' + ip });
        });
    }
    const board = new Board({
        port: new EtherPortClient({
            host: ip,
            port: process.env.MICROCONTROLLER_PORT,
        }),
        repl: true,
        timeout: connectionTimeout,
    });

    return new Promise((resolve, reject) => {
        board.on('ready', () => {
            boards[ip] = board;
            console.log('Connected to ' + ip);
            resolve({ code: 200, message: 'Connected to ' + ip });
        });
        setTimeout(() => {
            resolve({ code: 400, message: 'Unable to establish the connection to ' + ip });
        }, connectionTimeout);
    });
};

const getBoard = (ip) => {
    return boards[ip];
};

module.exports = {
    connect,
    getBoard,
};
