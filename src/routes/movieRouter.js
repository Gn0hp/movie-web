const express = require('express');
const router = express.Router();

const movieController = require('../app/controllers/movieController');


router.get('/:id',movieController.getMovie);

module.exports = router;