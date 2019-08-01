<template>
  <div class="left-nav">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      active-text-color="027be3"
    >
      <el-menu-item
        v-for="year in years"
        :key="year"
        :index="year"
        @click="goYear(year)"
      >
        <i class="el-icon-date"></i>
        <span slot="title">{{ year }}年上映</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'LeftNav',
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      years: ['2018', '2019', '2020']
    }
  },
  computed: {
    activeIndex() {
      return this.$route.params.type
    }
  },
  methods: {
    goYear(year) {
      this.$router.push(`/${year}`)
    }
  }
}
</script>

<style scoped lang="stylus">
.left-nav
  .el-menu
    border-right: 1px solid #fff
    min-height: calc(100% - 60) px

  .el-menu-vertical-demo:not(.el-menu--collapse)
    width: 180px
</style>
