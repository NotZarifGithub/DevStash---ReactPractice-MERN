const express = require('express');
const createList = require('../controllers/listController.js');
const verifyToken = require('../utils/verifyUser')
const router = express.Router()

router.post('/create/:id', verifyToken, createList)

module.exports = router