const Router = require('koa-router')
const Movie = require('../database/models/movie')

const { successResponse, failureResponse } = require('../utils')

const router = new Router({
  prefix: '/api/movie'
})

router.get('/list', async ctx => {
  try {
    const { type, year } = ctx.query
    let query = {}
    if (type) {
      // { movieTypes: $in: [type] }
      query.movieTypes = { $in: [type] }
    }
    if (year) {
      // { year: year }
      query.year = year
    }
    const movies = await Movie.find(query)
    successResponse(ctx, movies)
  } catch (err) {
    failureResponse(ctx, 500, err.message)
  }
})

router.get('/detail', async ctx => {
  try {
    const id = ctx.query.id
    const movie = await Movie.findOne({
      _id: id
    })
    const relativeMovies = await Movie.find({
      movieTypes: {
        $in: movie.movieTypes
      }
    })
    successResponse(ctx, {
      movie,
      relativeMovies
    })
  } catch (err) {
    failureResponse(ctx, 500, err.message)
  }
})

module.exports = router
