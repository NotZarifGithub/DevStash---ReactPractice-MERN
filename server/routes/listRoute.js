const express = require('express');
const { createList, getList, deleteList, updateList }  = require('../controllers/listController.js');
const verifyToken = require('../utils/verifyUser.js');
const router = express.Router()

router.post('/create', createList)
router.delete('/delete/:id', verifyToken, deleteList)
router.post('/update/:id', verifyToken, updateList)
router.get('/get/:id', getList)

module.exports = router