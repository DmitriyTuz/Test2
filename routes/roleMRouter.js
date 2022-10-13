const Router = require('express')
const router = new Router()
const roleMController = require('../controllers/roleMController')

router.get('/getAll', roleMController.getAll)
router.get('/getById/:_id', roleMController.getById)

router.post('/createRole', roleMController.createRole)

router.put('/addRoleToUser', roleMController.addRoleToUser)

router.delete("/deleteRoleFromUser", roleMController.deleteRoleFromUser)
router.delete("/deleteAllRolesFromUserWithId", roleMController.deleteAllRolesFromUserWithId)

router.put("/changeOldRoleOnNewRoleByUserId", roleMController.changeOldRoleOnNewRoleByUserId)

module.exports = router