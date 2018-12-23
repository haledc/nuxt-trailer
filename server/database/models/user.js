const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    unique: true
  },
  // 登录尝试次数
  loginAttempts: {
    type: Number,
    required: true,
    default: 0
  },
  role: {
    type: String,
    default: 'user'
  },
  // 锁定用户
  lockUntil: Number,
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

module.exports = mongoose.model('user', userSchema)
