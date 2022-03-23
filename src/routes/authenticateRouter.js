const express = require('express');
const router= express.Router();

const authenticateController=require('../app/controllers/authenticateController');
router.get('/login',authenticateController.login);
router.get('/signup',authenticateController.signup);
router.post('/createNewUserAccount',authenticateController.createNewUserAccount);
router.post('/loginHandle',authenticateController.loginHandle);
module.exports = router;