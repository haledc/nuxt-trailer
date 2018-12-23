<template>
  <el-container>
    <el-header>
      <HeaderNav @toggleCollapse="isCollapse=!isCollapse"/>
    </el-header>
    <el-container class="right">
      <el-aside style="width: auto">
        <LeftNav :isCollapse="isCollapse"/>
      </el-aside>
      <el-main>
        <MovieList :movieList="movieList"/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { normalizeMovies } from '../../utils'
import HeaderNav from '../../components/HeaderNav'
import LeftNav from '../../components/LeftNav'
import MovieList from '../../components/MovieList'

export default {
  async asyncData({ $axios }) {
    const { data } = await $axios.get('http://127.0.0.1:3000/api/movie/list', {})
    return { movieList: normalizeMovies(data.data) }

  },
  data() {
    return {
      isCollapse: true
    }
  },
  components: {
    HeaderNav,
    LeftNav,
    MovieList
  }
}
</script>

<style scoped lang="stylus">
  .el-header
    width 100%
    padding 0
    position fixed
    right 0
    top 0
    height 60px
    z-index 100

  .el-aside
    height 100%
    position fixed
    left 0
    top 60px
    z-index 100

  .el-main
    left 200px
</style>
