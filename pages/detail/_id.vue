<template>
  <div class="movie-detail">
    <el-row>
      <el-col :span="18">
        <Player :movie-detail="movieDetail" />
      </el-col>
      <el-col :span="6">
        <div class="detail-container">
          <div class="title">
            <el-button type="text" class="text" @click="$router.push('/')">
              回到首页
            </el-button>
          </div>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="关于本片" name="first" class="detail">
              <div class="movie-title">{{ movieDetail.title }}</div>
              <div class="rate">豆瓣评分：{{ movieDetail.rate }}分</div>
              <div class="tags">电影分类：{{ movieDetail.tags }}</div>
              <div class="update">更新时间：{{ movieDetail.update }}前更新</div>
              <div class="summary">影片介绍：</div>
              <div class="summary-text">{{ movieDetail.summary }}</div>
            </el-tab-pane>
            <el-tab-pane label="同类电影" name="second" class="relative-movies">
              <div
                v-for="movie in relativeMovies"
                :key="movie._id"
                class="movie-item"
                @click="goMovieDetail(movie._id)"
              >
                <div class="poster">
                  <img
                    :src="movie.poster"
                    alt="poster"
                    width="60"
                    height="90"
                  />
                </div>
                <div class="content">
                  <div class="content-title">{{ movie.title }}</div>
                  <div class="update">
                    {{ movie.pubdate }}/{{ movie.country }}
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Player from '../../components/Player'
import {
  normalizeMovieDetail,
  normalizeRelativeMovies
} from '../../assets/helper'

export default {
  name: 'Id',
  components: {
    Player
  },
  async asyncData({ $axios, params }) {
    const { id } = params
    const { data } = await $axios.get('/api/movie/detail', {
      params: {
        id
      }
    })
    return {
      movieDetail: normalizeMovieDetail(data.data.movie),
      relativeMovies: normalizeRelativeMovies(data.data.relativeMovies)
    }
  },
  data() {
    return {
      playsinline: true,
      activeTab: 'first'
    }
  },
  methods: {
    goMovieDetail(id) {
      this.$router.push(`/detail/${id}`)
    }
  }
}
</script>

<style scoped lang="scss">
.movie-detail {
  .detail-container {
    .title {
      text-align: center;

      .text {
        display: inline-block;
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 10px;
      }
    }

    .detail {
      .movie-title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
        color: #7f828b;
        text-align: center;
      }

      .rate,
      .tags,
      .update,
      .summary,
      .summary-text {
        font-size: 16px;
        margin-bottom: 10px;
      }

      .tags,
      .summary-text {
        line-height: 24px;
      }
    }

    .relative-movies {
      .movie-item {
        display: flex;
        margin-bottom: 10px;
        cursor: pointer;

        .poster {
          padding: 0 10px;
          flex: 0;
        }

        .content {
          margin-left: 10px;
          flex: 1;
          font-size: 20px;

          .content-title {
            margin-bottom: 40px;
            padding-top: 10px;
          }

          .update {
            padding-bottom: 10px;
          }
        }
      }
    }
  }
}
</style>
