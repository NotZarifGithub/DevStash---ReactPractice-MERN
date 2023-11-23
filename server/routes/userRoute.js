const express = require('express');
const {userController, updateUser, deleteUser, getUserList } = require('../controllers/userController.js')
const router = express.Router();
const verifyToken = require('../utils/verifyUser.js')

router.get('/test', userController)
router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/list/:id', verifyToken, getUserList)

module.exports = router;