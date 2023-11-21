const express = require('express');
const {userController, updateUser} = require('../controllers/userController.js')
const router = express.Router();
const verifyToken = require('../utils/verifyUser.js')

router.get('/test', userController)
router.post('/update/:id', verifyToken, updateUser)

module.exports = router;