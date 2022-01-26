const model = require('../Models/layer1.model');
const layer0model = require('../Models/layer0.model');

const buttonEvent = (req, res) => {
    const ip = req.query['ip'];
    const pin = req.query['pin'];
    const event = req.query['event'];
    model
        .buttonEvent(ip, pin, event)
        .then(({ code, message }) => res.status(code).send(message))
        .catch((err) => res.status(400).send(err));
};

const buttonRead = (req, res) => {
    const ip = req.query['ip'];
    const pin = req.query['pin'];
    layer0model
        .digitalRead(ip, pin)
        .then(({ code, message }) => res.status(code).send(message))
        .catch((err) => res.status(400).send(err));
};

module.exports = {
    buttonEvent,
    buttonRead,
};
