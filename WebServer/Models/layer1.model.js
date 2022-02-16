const { Button } = require('johnny-five');
const { boardsSpecs } = require('../Config/config');
const model = require('./model');
const eventModel = require('./event.model');

const buttonEvent = (ip, pin, event) => {
    const board = model.getBoard(ip);
    if (!board) {
        return Promise.resolve({ code: 400, message: 'Board not found' });
    } else if (!boardsSpecs.esp8266.isDigital(pin) && !boardsSpecs.esp8266.isAnalog(pin)) {
        return Promise.resolve({ code: 400, message: 'Wrong pin' });
    } else if (event !== 'pressed' && event !== 'released') {
        return Promise.resolve({ code: 400, message: 'Wrong event' });
    }
    const transformedEvent = event === 'pressed' ? 'press' : 'release';
    const button = new Button({ pin, board });

    const eventCode = eventModel.createEvent();

    button.on(transformedEvent, () => {
        button.removeAllListeners(transformedEvent);
        console.log('Button ' + event);
        eventModel.completeEvent(eventCode);
    });
    return Promise.resolve({ code: 200, message: eventCode });
};

module.exports = {
    buttonEvent,
};
