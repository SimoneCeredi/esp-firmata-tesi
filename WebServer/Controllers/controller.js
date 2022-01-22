const model = require('../Models/model');

const connect = (req, res) => {
    const ip = req.query['ip'];
    const board = model.connect(ip, res);
    board.on('ready', () => {
        model.addBoard(ip, board);
        console.log('Connected to ' + ip);
        res.status(200).send('Connected to ' + ip);
    });
};

module.exports = {
    connect,
};
