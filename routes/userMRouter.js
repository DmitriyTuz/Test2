const Router = require('express')
const router = new Router()
const userMController = require('../controllers/userMController')

const {check} = require('express-validator')

authMiddlewareMongo = require('../middleware/authMiddlewareMongo')
roleMiddlewareMongo = require('../middleware/roleMiddlewareMongo')

router.get('/get', /*roleMiddlewareMongo(['USER', 'ADMIN']),*/ userMController.getUsersM)

router.get('/getUserByIdWithRoles', /*roleMiddlewareMongo(['USER', 'ADMIN']),*/ userMController.getUserByIdWithRoles)
router.get('/getAllUsersWithRolesValues', userMController.getAllUsersWithRolesValues)


router.post('/createUserMongo',
    check('id', 'Идентификатор пользователя не может быть пустым !').notEmpty(),
    check('password', 'Пароль пользователя должен быть больше 4 и меньше 10 символов !').isLength({min:4, max:10}),
    userMController.createUserMongo)
router.post('/signinMongo', authMiddlewareMongo, userMController.loginMongo)

router.delete("/deleteUser", userMController.deleteUser)

module.exports = router