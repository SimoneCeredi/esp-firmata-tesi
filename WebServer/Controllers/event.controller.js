const model = require('../Models/event.model');

const getEvent = (req, res) => {
    const id = req.query['id'];
    res.status(200).send(String(model.getEventResult(id)));
};

module.exports = {
    getEvent,
};
