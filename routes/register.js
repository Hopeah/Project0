const express = require('express')
const router = express.Router()
const registerController = require('../controllers/register')

router.get('/', registerController.getRegistration) 

module.exports = router