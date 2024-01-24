const router = require('express').Router()
const authController = require('../controllers/authControllers')
router.post('/api/login', authController.login)
router.post('/api/writer/add', authController.add_writer)

module.exports = router