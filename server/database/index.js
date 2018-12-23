const mongoose = require('mongoose')
const User = require('./models/user')
const { md5Pwd } = require('../utils')

const DB_URL = 'mongodb://127.0.0.1:27017/trailer'

mongoose.connect(DB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDb server connected successfully!')
  })
  .catch(err => {
    console.log(err)
  })

const initAdmin = async () => {
  try {
    let user = await User.findOne({
      username: 'visitor'
    })
    if (!user) {
      const visitor = new User({
        username: 'visitor',
        email: 'test@test.com',
        password: md5Pwd('123456'),
        role: 'visitor'
      })
      await visitor.save()
      console.log('初始化用户成功！')
    }

  } catch (err) {
    console.log(err.message)
  }
}

module.exports = {
  mongoose,
  initAdmin: initAdmin()
}
