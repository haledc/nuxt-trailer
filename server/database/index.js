const mongoose = require('mongoose')
const { md5Pwd } = require('../utils')
const User = require('./models/user')

const DB_URL = 'mongodb://127.0.0.1:27017/trailer'

mongoose
  .connect(DB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDb server connected successfully!')
  })
  .catch(error => {
    console.log(error)
  })

const initAdmin = async () => {
  try {
    const user = await User.findOne({
      email: 'test@test.com'
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
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = {
  mongoose,
  initAdmin: initAdmin()
}
