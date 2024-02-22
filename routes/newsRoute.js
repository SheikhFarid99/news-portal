const router = require('express').Router()
const middleware = require('../middlewares/middleware')
const newsController = require('../controllers/newsController')

router.post('/api/news/add', middleware.auth, newsController.add_news)

router.get('/api/images', middleware.auth, newsController.get_images)
router.post('/api/images/add', middleware.auth, newsController.add_images)

// dashboard

router.get('/api/news', middleware.auth, newsController.get_dashboard_news)

module.exports = router