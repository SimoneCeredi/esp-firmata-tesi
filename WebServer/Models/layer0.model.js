const { Led, Sensor } = require('johnny-five');
const { boardsSpecs } = require('../Config/config');
const model = require('./model');

const digitalWrite = (ip, pin, value) => {
    const board = model.getBoard(ip);
    if (!board) {
        return { code: 400, message: 'Board not found' };
    } else if (!boardsSpecs.esp8266.isDigital(pin)) {
        return { code: 400, message: 'Wrong pin' };
    }
    board.digitalWrite(pin, value);
    console.log('Setting pin ' + pin + ' of ' + ip + ' to ' + value);
    return { code: 200, message: `On ${ip} setted pin ${pin} to ${value}` };
};

const analogWrite = (ip, pin, value) => {
    const board = model.getBoard(ip);
    if (!board) {
        return { code: 400, message: 'Board not found' };
    } else if (!boardsSpecs.esp8266.isDigital(pin)) {
        return { code: 400, message: 'Wrong pin' };
    } else if (value < boardsSpecs.esp8266.minAnalogValue || value > boardsSpecs.esp8266.maxAnalogValue) {
        return { code: 400, message: 'Wrong value' };
    }
    const led = new Led({ pin, board });
    board.repl.inject({ led });
    led.brightness(value);
    console.log('Setting pin ' + pin + ' of ' + ip + ' to ' + value);
    return { code: 200, message: `On ${ip} setted pin ${pin} to ${value}` };
};

const digitalRead = (ip, pin) => {
    const board = model.getBoard(ip);
    if (!board) {
        return Promise.resolve({ code: 400, message: 'Board not found' });
    } else if (!boardsSpecs.esp8266.isDigital(pin)) {
        return Promise.resolve({ code: 400, message: 'Wrong pin' });
    }
    return sensorRead(board, pin, 'digital');
};

const analogRead = (ip, pin) => {
    const board = model.getBoard(ip);
    if (!board) {
        return Promise.resolve({ code: 400, message: 'Board not found' });
    } else if (!boardsSpecs.esp8266.isAnalog(pin)) {
        return Promise.resolve({ code: 400, message: 'Wrong pin' });
    }
    return sensorRead(board, pin, 'analog');
};

const sensorRead = (board, pin, type) => {
    const pinSensor = new Sensor({ pin, board, type });

    return new Promise((resolve, reject) => {
        pinSensor.on('data', () => {
            const { value, raw } = pinSensor;
            if (raw != null) {
                pinSensor.disable();
                console.log('Value ' + raw);
                resolve({ code: 200, message: raw.toString() });
            }
        });
    });
};

module.exports = {
    digitalWrite,
    analogWrite,
    digitalRead,
    analogRead,
};
