const router = require('express').Router()
const middleware = require('../middlewares/middleware')
const newsController = require('../controllers/newsController')


// dashboard

router.post('/api/news/add', middleware.auth, newsController.add_news)
router.put('/api/news/update/:news_id', middleware.auth, newsController.update_news)
router.get('/api/images', middleware.auth, newsController.get_images)
router.post('/api/images/add', middleware.auth, newsController.add_images)

router.get('/api/news', middleware.auth, newsController.get_dashboard_news)
router.get('/api/news/:news_id', middleware.auth, newsController.get_dashboard_single_news)

module.exports = router