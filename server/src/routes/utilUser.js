const express = require('express')
const router = express.Router();
const utilUserController = require('../controller/utilUserController')

router.post('/login',utilUserController.login);
router.post('/register',utilUserController.register);
router.get('/login-register',utilUserController.send);

module.exports = router;