<template>
  <div class="login">
    <div class="form-container">
      <div class="manage-tip">
        <span class="title">预告片后台管理</span>
      </div>
      <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="60px" class="login-form">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="loginForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')" class="submit-btn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        email: 'test@test.com',
        password: '123456'
      },
      rules: {
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 10, message: '密码长度在6-10之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.$post('/api/admin/login', this.loginForm)
            .then(data => {
              if (data.success === true) {
                this.$message({
                  message: '登录成功',
                  type: 'success'
                })
                this.$router.push('/admin/movie-table')
              } else {
                this.$message({
                  message: data.msg,
                  type: 'warning'
                })
              }
            })
        } else {
          this.$message({
            message: '信息验证失败',
            type: 'error'
          })
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  .login
    position fixed
    width 100%
    height 100%
    background url("../assets/images/bg.jpg") no-repeat center center
    background-size 100% 100%

    .form-container
      width 370px
      height 210px
      position absolute
      top 100px
      left 50%
      padding 25px
      border-radius 5px
      text-align center
      transform translateX(-50%)

      .manage-tip
        .title
          font-family "Microsoft YaHei"
          font-weight bold
          font-size 26px
          color #fff

      .login-form
        margin 20px auto 0
        background-color #fff
        padding 20px 40px 20px 20px
        border-radius 5px
        box-shadow 0 5px 10px #ccc

        .submit-btn
          width 100%
</style>
