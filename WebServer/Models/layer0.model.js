const { Pin } = require('johnny-five');
const boardsSpecs = require('../Config/config');
const model = require('./model');

const digitalWrite = (ip, pin, value) => {
    const board = model.getBoard(ip);
    if (!board) {
        return { code: 400, message: 'Board not found' };
    } else if (pin < boardsSpecs.esp8266.minDigitalPin || pin > boardsSpecs.esp8266.maxDigitalPin) {
        return { code: 400, message: 'Wrong pin' };
    }
    const pinSensor = new Pin({ pin, board, type: 'digital' });
    board.repl.inject({ pinSensor });
    pinSensor.write(value);
    console.log('Setting pin ' + pin + ' of ' + ip + ' to ' + value);
    return { code: 200, message: `On ${ip} setted pin ${pin} to ${value}` };
};

module.exports = {
    digitalWrite,
};
