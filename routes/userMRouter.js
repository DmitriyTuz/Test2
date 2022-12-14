const Router = require('express')
const router = new Router()
const userMController = require('../controllers/userMController')

const {check} = require('express-validator')

authMiddlewareMongo = require('../middleware/authMiddlewareMongo')
roleMiddlewareMongo = require('../middleware/roleMiddlewareMongo')

router.get('/get', roleMiddlewareMongo(['USER', 'ADMIN']), userMController.getUsersM)
router.post('/createUserMongo',
    check('_id', 'Идентификатор пользователя не может быть пустым !').notEmpty(),
    check('password', 'Пароль пользователя должен быть больше 4 и меньше 10 символов !').isLength({min:4, max:10}),
    userMController.createUserMongo)
router.post('/signinMongo', authMiddlewareMongo, userMController.loginMongo)

module.exports = router