const model = require('../Models/model');

const connect = (req, res) => {
    const ip = req.query['ip'];
    model
        .connect(ip, res)
        .then(({ code, message }) => res.status(code).send(message))
        .catch((err) => res.status(400).send(err));
};

module.exports = {
    connect,
};
