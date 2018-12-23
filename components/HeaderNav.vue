<template>
  <div class="header-nav">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      active-text-color="#027be3"
    >
      <div class="header-title">
        <el-button class="icon" icon="el-icon-menu" circle @click="toggleCollapse"></el-button>
        <div class="text">电影预告片网站</div>
      </div>
      <el-menu-item index="100">
        <el-button type="info" size="small" round @click="goLogin">登录</el-button>
      </el-menu-item>
      <el-menu-item
        :index="index+''"
        v-for="(category,index) in categories.slice().reverse()"
        :key="category"
        @click="goCategory(category)"
      >
        {{ category }}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '13',
      categories: [
        '全部', '动作', '科幻', '惊悚', '喜剧', '冒险', '剧情', '奇幻', '古装', '犯罪', '动画', '爱情', '悬疑', '武侠'
      ]
    }
  },
  methods: {
    toggleCollapse() {
      this.$emit('toggleCollapse')
    },
    goCategory(category) {
      this.$router.push(`/${category}`)
    },
    goLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang="stylus">
  .header-nav
    .el-menu
      padding-right 20px
      border-bottom 1px solid #fff

    .header-title
      position absolute
      left 12px
      top 12px

      .icon
        padding 10px
        vertical-align middle

      .text
        display inline-block
        font-weight bolder
        color #027be3
        font-size 25px
        vertical-align middle

    .el-menu-item
      font-size 16px
      float right
</style>
