<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pageSize,currentPage*pageSize)"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        width="80"
      />
      <el-table-column align="center" label="名称" prop="name" />
      <el-table-column align="center" label="主图">
        <template slot-scope="scope">
          <img v-if="scope.row.mainimage ===null" src="https://img95.699pic.com/xsj/0c/oj/94.jpg%21/fw/700/watermark/url/L3hzai93YXRlcl9kZXRhaWwyLnBuZw/align/southeast" height="45px">
          <img v-else :src="scope.row.mainimage" height="45px">
          <!-- {{ scope.row.mainimage }} -->
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleOpen(scope.$index, scope.row)">查看 </el-button>
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div ref="pager" class="pager-box">
      <div class="total">
        共
        <span style="color: #259dff;">{{ total }}</span> 条记录
      </div>
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        layout="sizes, prev, pager, next"
        :total="total"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { getMenuList } from '@/api/menu'

export default {
  data() {
    return {
      tableData: [],
      search: '',
      listLoading: true,
      currentPage: 1, // 当前页码
      total: 0, // 总条数
      pageSize: 10 // 每页的数据条数
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleOpen(index, row) {
      console.log(index, row)
    },
    fetchData() {
      this.listLoading = true
      getMenuList().then(response => {
        this.tableData = response.data
        this.listLoading = false
        this.total = response.data.length
      })
    },
    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    }
  }
}
</script>
<style lang="scss" scoped>
.pager-box {
        display: flex;
        justify-content: space-between;
        height: 44px;
        align-items: center;
        align-items: flex-end;
        padding: 0 16px 0 16px;
        .total {
            font-size: 14px;
            line-height: 34px;
        }
    }
</style>
