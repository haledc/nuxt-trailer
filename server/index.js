const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const session = require('koa-session')
const bodyParser = require('koa-bodyparser')
const config = require('../nuxt.config.js')
const { failureResponse } = require('./utils')
const routers = require('./routes')
require('./database')

const app = new Koa()

// Import and Set Nuxt.js options
config.dev = !(app.env === 'production')

const CONFIG = {
  key: 'nuxt-trailer-session',
  maxAge: 1000 * 60 * 60 * 24,
  overwrite: true,
  httpOnly: false,
  signed: true,
  rolling: false
}

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const host = process.env.HOST || '127.0.0.1'
  const port = process.env.PORT || 9097

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(bodyParser())
  app.keys = ['vue koa trailer']

  app.use(async (ctx, next) => {
    try {
      await next()
    } catch (error) {
      console.log('error:', error.message)
      if (error.message === '401') {
        failureResponse(ctx, 401, '没有权限，请重新登录')
      } else {
        config.dev
          ? failureResponse(ctx, 500, error.message)
          : failureResponse(ctx, 500, '服务器内部错误')
      }
    }
  })

  app.use(session(CONFIG, app))
  app.use(routers.routes()).use(routers.allowedMethods())

  app.use(ctx => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
