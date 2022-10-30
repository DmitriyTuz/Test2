const Router = require('express')
const router = new Router()
const roleMController = require('../controllers/roleMController')

const {check} = require('express-validator')

router.get('/getAll', roleMController.getAll)

router.get('/getBy_Id/:_id',
    check('id', 'Идентификатор пользователя не может быть пустым !').notEmpty(),
    roleMController.getBy_Id)

router.get('/getByValue/:value', roleMController.getByValue)

router.post('/createRole', roleMController.createRole)

router.put('/changeRoleValueById', roleMController.changeRoleValueById)
router.put('/addRoleToUser', roleMController.addRoleToUser)

router.delete("/deleteRoleFromUser", roleMController.deleteRoleFromUser)
router.delete("/deleteAllRolesFromUserWithId", roleMController.deleteAllRolesFromUserWithId)
router.delete("/deleteRoleById/:_id", roleMController.deleteRoleById)
router.delete("/deleteRoleByValue", roleMController.deleteRoleByValue)

router.put("/changeOldRoleOnNewRoleByUserId", roleMController.changeOldRoleOnNewRoleByUserId)

module.exports = router