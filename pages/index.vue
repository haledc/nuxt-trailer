<template>
  <el-container>
    <el-header>
      <HeaderNav @toggleCollapse="isCollapse = !isCollapse" />
    </el-header>
    <el-container class="right">
      <el-aside style="width: auto">
        <LeftNav :is-collapse="isCollapse" />
      </el-aside>
      <el-main>
        <transition name="slide" mode="out-in">
          <nuxt :key="key" />
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HeaderNav from '../components/HeaderNav'
import LeftNav from '../components/LeftNav'

export default {
  name: 'Index',
  loading: true,
  components: {
    HeaderNav,
    LeftNav
  },
  data() {
    return {
      isCollapse: true
    }
  },
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped lang="stylus">
.el-header
  width: 100%
  padding: 0
  position: fixed
  right: 0
  top: 0
  height: 60px
  z-index: 100

.el-aside
  height: 100%
  position: fixed
  left: 0
  top: 60px
  z-index: 100

.el-main
  left: 200px

.slide-enter-active, .slide-leave-active
  transition: all 0.5s

.slide-enter
  opacity: 0
  transform: translateX(-100%)

.slide-leave-to
  opacity: 0
  transform: translateX(100%)
</style>
