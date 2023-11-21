const express = require('express');
const {userController, updateUser, deleteUser} = require('../controllers/userController.js')
const router = express.Router();
const verifyToken = require('../utils/verifyUser.js')

router.get('/test', userController)
router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)

module.exports = router;