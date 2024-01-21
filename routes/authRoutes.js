const router = require('express').Router()
const authController = require('../controllers/authControllers')
router.post('/api/login', authController.login)

module.exports = router