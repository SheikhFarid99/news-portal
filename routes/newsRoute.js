const router = require('express').Router()
const middleware = require('../middlewares/middleware')
const newsController = require('../controllers/newsController')

router.post('/api/news/add', middleware.auth, newsController.add_news)

module.exports = router