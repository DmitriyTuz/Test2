const Router = require('express')
const router = new Router()
const roleMController = require('../controllers/roleMController')

// router.get('/', roleMController.getAll)
router.post('/create', roleMController.create)

module.exports = router