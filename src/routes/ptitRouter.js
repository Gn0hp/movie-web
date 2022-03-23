const express = require('express');
const router = express.Router();

const movieController = require('../app/controllers/ptitController');


router.get('/news',movieController.news);

module.exports = router;