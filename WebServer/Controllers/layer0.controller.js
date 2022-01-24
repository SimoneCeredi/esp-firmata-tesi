const model = require('../Models/layer0.model');

const digitalWrite = (req, res) => {
    const ip = req.query['ip'];
    const pin = req.query['pin'];
    let value = req.query['value'];
    if (value === 'true' || value === 'false') {
        value = value === 'true' ? 1 : 0;
    } else {
        res.status(400).send('Wrong value');
        return;
    }
    const { code, message } = model.digitalWrite(ip, pin, value);
    res.status(code).send(message);
};

const analogWrite = (req, res) => {
    const ip = req.query['ip'];
    const pin = req.query['pin'];
    let value = parseInt(req.query['value']);
    const { code, message } = model.analogWrite(ip, pin, value);
    res.status(code).send(message);
};

const digitalRead = (req, res) => {
    const ip = req.query['ip'];
    const pin = req.query['pin'];

    model
        .digitalRead(ip, pin)
        .then(({ code, message }) => res.status(code).send(message))
        .catch((err) => res.status(400).send(err));
};

module.exports = {
    digitalWrite,
    analogWrite,
    digitalRead,
};
