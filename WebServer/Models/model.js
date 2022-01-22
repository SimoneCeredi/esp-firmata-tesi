const EtherPortClient = require('etherport-client').EtherPortClient;
const { Board } = require('johnny-five');

let boards = new Map();

const connect = (ip) => {
    return new Board({
        port: new EtherPortClient({
            host: ip,
            port: process.env.MICROCONTROLLER_PORT,
        }),
        repl: true,
    });
};

const addBoard = (ip, board) => {
    boards.set(ip, board);
};

module.exports = {
    connect,
    addBoard,
};
