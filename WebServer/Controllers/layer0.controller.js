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

module.exports = {
    digitalWrite,
};
