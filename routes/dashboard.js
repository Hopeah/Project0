const express = require('express')
const router = express.Router()
const dashboardController = require('../controllers/dashboard')
const { ensureAuthenticated } = require('../config/Auth')

router.get('/', ensureAuthenticated, dashboardController.getDashboard) 

router.post('/createDoc', ensureAuthenticated, dashboardController.createDoc)

module.exports = router