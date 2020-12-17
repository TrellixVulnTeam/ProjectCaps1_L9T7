const express = require('express')
const router = express.Router();
const utilUserController = require('../controller/utilUserController')

/* router.get('/?:id=user/?:id',utilUserController.verifyaccount); */
router.get('/user',utilUserController.verifyaccount);
router.get('/',utilUserController.verify);


module.exports = router;