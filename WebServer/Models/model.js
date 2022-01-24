const EtherPortClient = require('etherport-client').EtherPortClient;
const { Board } = require('johnny-five');

let boards = new Map();

const connect = (ip) => {
    const board = new Board({
        port: new EtherPortClient({
            host: ip,
            port: process.env.MICROCONTROLLER_PORT,
        }),
        repl: true,
    });

    return new Promise((resolve, reject) => {
        board.on('ready', () => {
            boards.set(ip, board);
            console.log('Connected to ' + ip);
            resolve({ code: 200, message: 'Connected to ' + ip });
        });
    });
};

const getBoard = (ip) => {
    return boards.get(ip);
};

module.exports = {
    connect,
    getBoard,
};
