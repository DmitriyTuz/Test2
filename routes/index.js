const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const userMRouter = require('./userMRouter')
const roleMRouter = require('./roleMRouter')

router.use('/user', userRouter)
router.use('/userM', userMRouter)
router.use('/roleM', roleMRouter)

module.exports = router