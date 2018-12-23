const utility = require('utility')

const successResponse = (ctx, data) => {
  ctx.body = {
    success: true,
    data
  }
}

const failureResponse = (ctx, status, msg) => {
  ctx.status = status
  ctx.body = {
    success: false,
    msg
  }
}

const md5Pwd = pwd => {
  const salt = 'hale_vue_koa_mongoose_#$%^&*!@'
  return utility.md5(utility.md5(pwd + salt))
}

module.exports = {
  successResponse,
  failureResponse,
  md5Pwd
}
