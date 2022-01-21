const EtherPortClient = require('etherport-client').EtherPortClient;
const { Board } = require('johnny-five');

let boards = new Map();

const connect = async (ip, res) => {
    const board = new Board({
        port: new EtherPortClient({
            host: ip,
            port: process.env.MICROCONTROLLER_PORT,
        }),
        repl: true,
    });
    await board.on('ready', () => {
        boards.set(ip, board);
        console.log('Connected to ' + ip);
        res.status(200).send('Connected');
    });
};

module.exports = {
    connect,
};
