const model = require('../Models/model');

const connect = async (req, res) => {
    const ip = req.query['ip'];
    await model.connect(ip, res);
};

module.exports = {
    connect,
};
