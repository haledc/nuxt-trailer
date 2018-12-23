<template>
  <div class="movie-table">
    <div class="title-container">
      <div class="title">电影后台管理</div>
      <el-button
        round class="logout"
        size="mini"
        type="info"
        @click="logout"
      >
        退出
      </el-button>
    </div>
    <div class="table-container">
      <el-table
        :data="filterMovieList"
        border
        style="width: 100%">
        <el-table-column
          prop="poster"
          label="海报"
          align="center"
          width="180"
        >
          <template slot-scope="scope">
            <img :src="scope.row.poster" alt="poster" width="60" height="90">
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="名称"
          align="center"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="上映时间"
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="rate"
          label="评分"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            {{scope.row.rate}} 分
          </template>
        </el-table-column>
        <el-table-column
          prop="update"
          label="更新时间"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            {{scope.row.update}}前更新
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
          label="电影id"
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          align="center"
          width="200"
        >
          <template slot-scope="scope">
            <el-tag
              style="margin-right: 5px"
              v-for="item in scope.row.type.slice(0,3)"
              :key="item"
            >
              {{item}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="tags"
          label="标签"
          align="center"
          width="350"
        >
          <template slot-scope="scope">
            <el-tag
              style="margin-right: 5px;margin-bottom: 5px"
              type="danger"
              v-for="item in scope.row.tags.slice(0,5)"
              :key="item"
            >
              {{item}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="detail"
          label="详情"
          align="center"
          width="180"
        >
          <template slot-scope="scope">
            <el-button type="primary" class="button" @click="goDetail(scope.row._id)">
              <i class="el-icon-view"></i>
              详情
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="delete"
          label="删除"
          align="center"
        >
          <template slot-scope="scope" style="color: red;">
            <el-button type="danger" class="button" @click="deleteMovie(scope.row._id)">
              <i class="el-icon-delete"></i>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-row>
      <el-col :span="24">
        <el-pagination
          class="pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="pagination.pageSizes"
          :page-size="pagination.pageSize"
          :layout="pagination.layout"
          :total="pagination.total">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { normalizeAdminMovies } from '../../utils'

export default {
  name: 'MovieTable',
  data() {
    return {
      adminMovieList: [],
      filterMovieList: [],
      pagination: {
        currentPage: 1,
        pageSize: 5,
        pageSizes: [5, 10, 15, 20],
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0
      }
    }
  },
  beforeCreate() {
    this.$axios.get('http://127.0.0.1:9097/api/admin/movie/list')
      .then(res => {
        if (res.data.success) {
          this.adminMovieList = normalizeAdminMovies(res.data.data)
          this.setPagination()
        }
      })
  },
  methods: {
    goDetail(id) {
      this.$router.push(`/detail/${id}`)
    },
    logout() {
      this.$axios.post('http://127.0.0.1:9097/api/admin/logout')
        .then(res => {
          if (res.data.success) {
            this.$router.push('/')
            this.$message({
              message: '注销成功！',
              type: 'success'
            })
          }
        })
    },
    deleteMovie(id) {
      this.$confirm('确定要删除吗', '警告', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.$axios.delete('http://127.0.0.1:9097/api/admin/movies', {
            params: {
              id
            }
          })
            .then(res => {
              if (res.data.success) {
                this.adminMovieList = normalizeAdminMovies(res.data.data)
                this.setPagination()
                this.$message({
                  message: '删除成功！',
                  type: 'success'
                })
              } else {
                this.$message({
                  message: res.data.msg,
                  type: 'warning'
                })
              }
            })
        })
        .catch(() => {
          this.$message({
            message: '取消删除',
            type: 'success'
          })
        })
    },
    setPagination() {
      this.pagination.total = this.adminMovieList.length
      this.pagination.currentPage = 1
      this.pagination.pageSize = 5
      this.filterMovieList = this.adminMovieList.filter((item, index) => index < this.pagination.pageSize)
    },
    handleSizeChange(val) {
      this.pagination.currentPage = 1
      this.pagination.pageSize = val
      this.filterMovieList = this.adminMovieList.filter((item, index) => index < val)
    },
    handleCurrentChange(pageIndex) {
      const startNum = this.pagination.pageSize * (pageIndex - 1)
      const restTableData = this.adminMovieList.filter((item, index) => index >= startNum)
      this.filterMovieList = restTableData.filter((item, index) => index < this.pagination.pageSize)
    }
  }
}
</script>

<style scoped lang="stylus">
  .movie-table
    .title-container
      width 100%
      height 60px
      background #027be3
      color #fff

      .title
        font-size 20px
        font-weight bolder
        float left
        margin-left 20px
        line-height 60px

      .logout
        font-size 20px
        float right
        margin-top 12px
        margin-right 20px

    .table-container
      padding 10px

    .pagination
      float right

</style>
