const mongoose = require('mongoose')
const User = require('./models/user')
const { md5Pwd } = require('../utils')

const DB_URL = 'mongodb://127.0.0.1:27017/trailer'

mongoose.connect(DB_URL)

const connection = mongoose.connection

connection.on('connected', () => {
  console.log('MongoDb server connected successfully!')
})

connection.on('error', () => {
  console.log('MongoDB server connected failed.')
})

connection.on('disconnected', () => {
  console.log('MongoDB server is disconnected.')
})

const initAdmin = async () => {
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
}

module.exports = {
  connection,
  initAdmin: initAdmin()
}
