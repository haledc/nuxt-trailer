<template>
  <div class="movie-list">
    <el-row>
      <el-col :span="6" v-for="movie in movieList" :key="movie._id">
        <div class="card-container">
          <el-card shadow="hover" class="card">
            <div class="poster" @click="playVideo(movie.url)">
              <img :src="movie.poster" width="390" height="560">
            </div>
            <div style="" class="content">
              <div class="title">{{ movie.title }}</div>
              <div class="sub-title">{{ movie.subtitle }}</div>
              <div class="text">
                {{ movie.summary }}
              </div>
              <div class="actions">
                <span class="update-time">{{ movie.update }}前更新</span>
                <span class="rate">{{ movie.rate }}分</span>
                <el-button type="text" class="button detail" @click="goDetail(movie._id)">
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
      :modal="false"
      @close="handleClose"
      style="padding: 35px"
      :show-close="false"
      :center="true"
    >
      <div
        ref="player"
        :playsinline="playsinline"
        v-video-player:VueVideoPlayer="playerOptions"
      >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { normalizeMovies } from '../../utils'

export default {
  name: 'List',
  async asyncData({ $axios, params }) {
    console.log('params', params)
    const { data } = await $axios.get('http://127.0.0.1:3000/api/movie/list', {
      type: params.type
    })
    return { movieList: normalizeMovies(data.data) }
  },
  props: {
    movieList: {
      type: Array,
      required: true
    }
  },
  mounted() {
    console.log('this is current player instance object', this.VueVideoPlayer)
  },
  data() {
    return {
      dialogVisible: false,
      playsinline: true,
      playerOptions: {
        autoplay: true,
        sources: [{
          type: 'video/mp4',
          src: ''
        }]
      }
    }
  },
  methods: {
    goDetail(id) {
      console.log(id)
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
    position absolute
    top 61px
    left 65px
    overflow auto

    .card-container
      padding: 10px

      .card
        .poster
          text-align center

        .content
          padding 10px 10px 0

          .title
            font-size 16px
            font-weight bold

          .sub-title
            font-size 12px
            color #aaa
            margin 10px 0

          .text
            height 150px
            overflow hidden
            text-overflow ellipsis

          .actions
            .update-time
              color #21BA45

            .rate
              color #E91E63

            .detail
              font-size 16px

</style>
