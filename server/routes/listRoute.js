const express = require('express');
const createList  = require('../controllers/listController.js');
const router = express.Router()

router.post('/create', createList)

module.exports = router