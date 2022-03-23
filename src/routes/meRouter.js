const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/meController');


router.get('/',meController.mePage);

module.exports = router;