const Router = require('koa-router')
const Movie = require('../database/models/movie')
const User = require('../database/models/user')
const { successResponse, failureResponse, md5Pwd } = require('../utils')

const router = new Router({
  prefix: '/api/admin'
})

router.get('/movie/list', async ctx => {
  try {
    const { user } = ctx.session
    if (user) {
      const { type, year } = ctx.query
      let query = {}
      if (type) {
        query.movieTypes = { $in: [type] }
      }
      if (year) {
        query.year = year
      }
      const movies = await Movie.find(query)
      successResponse(ctx, movies)
    } else {
      failureResponse(ctx, 401, '没有权限，请重新登录')
    }
  } catch (err) {
    failureResponse(ctx, 500, err.message)
  }
})

router.delete('/movies', async ctx => {
  try {
    const { role } = ctx.session.user
    if (role === 'admin') {
      const id = ctx.query.id
      const movie = await Movie.findOne({
        _id: id
      })
      if (movie) {
        await movie.remove()
      }
      const movies = await Movie.find()
      successResponse(ctx, movies)
    } else {
      failureResponse(ctx, 200, '你没有权限删除')
    }
  } catch (err) {
    failureResponse(ctx, 500, err.message)
  }
})

router.post('/login', async ctx => {
  try {
    const { email, password } = ctx.request.body
    const user = await User.findOne({
      email
    })
    if (!user) {
      failureResponse(ctx, 200, '用户不存在')
    } else {
      const match = await User.findOne({
        email,
        password: md5Pwd(password)
      })
      if (match) {
        ctx.session.user = {
          _id: match._id,
          email: match.email,
          role: match.role,
          username: match.username
        }
        successResponse(ctx, match)
      } else {
        failureResponse(ctx, 500, '用户名或者密码不正确')
      }
    }
  } catch (err) {
    failureResponse(ctx, 500, err.message)
  }
})

router.post('/logout', async ctx => {
  delete ctx.session.user
  successResponse(ctx, '注销成功')
})

module.exports = router
