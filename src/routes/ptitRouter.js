const express = require('express');
const router = express.Router();

const ptitController = require('../app/controllers/ptitController');


router.get('/news',ptitController.news);
router.get('/introductions', ptitController.introductions);
router.get('/education',ptitController.education);
router.get('/tech',ptitController.tech);
router.get('/cooperations', ptitController.cooperations)
router.get('/entrancy', ptitController.entrancy);
router.get('/library', ptitController.library);
router.get('/emails', ptitController.emails);
router.get('/covid19', ptitController.covid19);


module.exports = router;