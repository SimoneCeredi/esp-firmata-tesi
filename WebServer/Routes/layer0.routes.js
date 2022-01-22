const express = require('express');
const router = express.Router();
const controller = require('../Controllers/layer0.controller');

router.get('/digitalwrite', controller.digitalWrite);
router.get('/analogwrite', controller.analogWrite);
router.get('/digitalread', controller.digitalRead);

module.exports = router;
