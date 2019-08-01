<template>
  <div class="movie-list">
    <el-row>
      <el-col v-for="movie in movieList" :key="movie._id" :span="6">
        <div class="card-container">
          <el-card shadow="hover" class="card">
            <div class="poster" @click="playVideo(movie.url)">
              <img v-lazy="movie.poster" width="390" height="560" />
            </div>
            <div class="content">
              <div class="title">{{ movie.title }}</div>
              <div class="sub-title">{{ movie.subtitle }}</div>
              <div class="text">
                {{ movie.summary }}
              </div>
              <div class="actions">
                <span class="update-time">{{ movie.update }}前更新</span>
                <span class="rate">{{ movie.rate }}分</span>
                <el-button
                  type="text"
                  class="button detail"
                  @click="goDetail(movie._id)"
                >
                  <i class="el-icon-view"></i>
                  详情
                </el-button>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      :visible.sync="dialogVisible"
      :modal="true"
      style="padding: 35px"
      :show-close="false"
      :center="true"
      @close="handleClose"
    >
      <div
        v-video-player:VueVideoPlayer="playerOptions"
        :playsinline="playsinline"
      ></div>
    </el-dialog>
  </div>
</template>

<script>
import { normalizeMovies } from '../../assets/helper'

export default {
  name: 'Index',
  data() {
    return {
      dialogVisible: false,
      playsinline: true,
      playerOptions: {
        autoplay: true,
        sources: [
          {
            type: 'video/mp4',
            src: ''
          }
        ]
      }
    }
  },
  async asyncData({ $axios }) {
    const data = await $axios.$get('/api/movie/list')
    return { movieList: normalizeMovies(data.data) }
  },
  methods: {
    goDetail(id) {
      this.$router.push(`/detail/${id}`)
    },
    handleClose() {
      this.playerOptions.sources[0].src = ''
    },
    playVideo(url) {
      this.dialogVisible = true
      this.playerOptions.sources[0].src = url
    }
  }
}
</script>

<style scoped lang="stylus">
.movie-list
  position: absolute
  top: 61px
  left: 65px
  overflow: auto

  .card-container
    padding: 10px

    .card
      .poster
        text-align: center

      .content
        padding: 10px 10px 0

        .title
          font-size: 16px
          font-weight: bold

        .sub-title
          font-size: 12px
          color: #aaa
          margin: 10px 0

        .text
          height: 143px
          overflow: hidden
          text-overflow: ellipsis
          line-height: 24px

        .actions
          .update-time
            color: #21ba45

          .rate
            color: #e91e63

          .detail
            font-size: 16px
</style>
