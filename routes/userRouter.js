const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')

const authMiddleware = require('../middleware/authMiddleware')

router.get('/info', userController.getAll)
router.post('/signup', userController.registration)
router.post('/signin',  authMiddleware, userController.login)
router.get('/latency', userController.latency)
router.get('/logout', authMiddleware, userController.logout)

module.exports = router