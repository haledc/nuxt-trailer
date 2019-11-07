const utility = require('utility')

const dispatchResponse = (
  ctx,
  { status = 200, success = true, data = {}, msg = 'ok' }
) => {
  ctx.status = status
  ctx.body = {
    success,
    data,
    msg
  }
}

const md5Pwd = pwd => {
  const salt = 'hale_vue_koa_mongoose_#$%^&*!@'
  return utility.md5(utility.md5(pwd + salt))
}

module.exports = {
  dispatchResponse,
  md5Pwd
}
