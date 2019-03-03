const Koa = require('koa')
const session = require('koa-session')
const bodyParser = require('koa-bodyparser')
const routers = require('./routes')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const { failureResponse } = require('./utils')
require('./database')

const app = new Koa()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 9097

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
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

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(bodyParser())
  app.keys = ['vue koa trailer']

  app.use(async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      console.log('error:', err.message)
      if (err.message === '401') {
        failureResponse(ctx, 401, '没有权限，请重新登录')
      } else {
        config.dev
          ? failureResponse(ctx, 500, err.message)
          : failureResponse(ctx, 500, '服务器内部错误')
      }
    }
  })

  app.use(session(CONFIG, app))
  app.use(routers.routes()).use(routers.allowedMethods())

  app.use(ctx => {
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset
    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
