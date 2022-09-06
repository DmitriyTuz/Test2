const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')

const authMiddleware = require('../middleware/authMiddleware')
const authMiddlewareMongo = require('../middleware/authMiddlewareMongo')

router.get('/info', userController.getAll)
router.post('/signup', userController.registration)
router.post('/signin',  authMiddleware, userController.login)
router.get('/latency', userController.latency)
router.get('/logout', authMiddleware, userController.logout)

router.post('/createUserMongo', userController.createUserMongo)
router.post('/signinMongo',  authMiddlewareMongo, userController.loginMongo)

module.exports = router