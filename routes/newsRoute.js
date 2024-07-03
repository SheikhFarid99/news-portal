const router = require('express').Router()
const middleware = require('../middlewares/middleware')
const newsController = require('../controllers/newsController')


// dashboard

router.post('/api/news/add', middleware.auth, newsController.add_news)
router.put('/api/news/update/:news_id', middleware.auth, newsController.update_news)
router.put('/api/news/status-update/:news_id', middleware.auth, newsController.update_news_update)

router.get('/api/images', middleware.auth, newsController.get_images)
router.post('/api/images/add', middleware.auth, newsController.add_images)

router.get('/api/news', middleware.auth, newsController.get_dashboard_news)
router.get('/api/news/:news_id', middleware.auth, newsController.get_dashboard_single_news)


// website

router.get('/api/all/news', newsController.get_all_news)
router.get('/api/popular/news', newsController.get_popular_news)
router.get('/api/latest/news', newsController.get_latest_news)
router.get('/api/images/news', newsController.get_images)
router.get('/api/recent/news', newsController.get_recent_news)


router.get('/api/news/details/:slug', newsController.get_news)
router.get('/api/category/all', newsController.get_categories)

router.get('/api/category/news/:category', newsController.get_category_news)
router.get('/api/search/news', newsController.news_search)

module.exports = router