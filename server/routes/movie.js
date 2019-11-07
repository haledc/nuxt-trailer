const Router = require('@koa/router')
const Movie = require('../database/models/movie')

const { dispatchResponse } = require('../utils')

const router = new Router({
  prefix: '/api/movie'
})

router.get('/list', async ctx => {
  const { type, year } = ctx.query
  const query = {}
  if (type) {
    // { movieTypes: $in: [type] }
    query.movieTypes = { $in: [type] }
  }
  if (year) {
    // { year: year }
    query.year = year
  }
  const movies = await Movie.find(query)
  dispatchResponse(ctx, { data: movies })
})

router.get('/detail', async ctx => {
  const id = ctx.query.id
  const movie = await Movie.findOne({
    _id: id
  })
  const relativeMovies = await Movie.find({
    movieTypes: {
      $in: movie.movieTypes
    }
  })
  dispatchResponse(ctx, {
    data: {
      movie,
      relativeMovies
    }
  })
})

module.exports = router
