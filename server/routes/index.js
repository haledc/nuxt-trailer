const Router = require('@koa/router')
const adminRouter = require('./admin')
const movieRouter = require('./movie')

const router = new Router()

router.use(adminRouter.routes()).use(adminRouter.allowedMethods())
router.use(movieRouter.routes()).use(movieRouter.allowedMethods())

module.exports = router
