const express = require('express');
const router = express.Router();
const translateController = require('../controllers/TranslateController');

router.post('/translate-tone', translateController.translateTone);

module.exports = router;
