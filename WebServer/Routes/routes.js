const express = require('express');
const router = express.Router();
const controller = require('../Controllers/controller');

router.get('/connect', controller.connect);

module.exports = router;
