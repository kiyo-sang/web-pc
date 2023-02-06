<template>
    <div class="app-container">
        <el-button type="primary" icon="el-icon-edit" size="medium" class="addButton" @click="dialogVisible = true">新增</el-button>
        <el-table
            :data="tableData"
            v-loading="listLoading"
            style="width: 100%">
            <el-table-column
                type="index"
                width="80"
                label="序号"
                align="center"
            />
            <el-table-column align="center" label="id" prop="id" width="110" />
            <el-table-column align="center" label="图片" width="300">
                <template slot-scope="scope">
                    <img v-if="scope.row.mainimage ===null" src="https://img95.699pic.com/xsj/0c/oj/94.jpg%21/fw/700/watermark/url/L3hzai93YXRlcl9kZXRhaWwyLnBuZw/align/southeast" height="45px">
                    <img v-else :src="scope.row.mainimage" height="45px">
                </template>
            </el-table-column>
            <el-table-column
                label="名称"
                align="center"
                prop="name"
            />
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
        title="新增公告"
        :visible.sync="dialogVisible"
        width="30%"
        >
        <!-- <span>这是一段信息</span> -->

        <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="4" class="col-title"><div class="grid-content">公告内容</div></el-col>
            <el-col :span="20">
                <el-select v-model="mid" filterable placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-col>

        </el-row>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="isOk">确 定</el-button>
        </span>
        </el-dialog>
    </div>
    
</template>

<script>
import { EveryDayList, EveryDayDelete, addNotice } from "@/api/admin";

export default {
    data() {
        return {
            dialogVisible: false,
            tableData: [],
            mid: '',
            options: []
        }
    },
    methods: {
        fetchData() {
            this.listLoading = true
            EveryDayList().then(response => {
                this.tableData = response.data
                this.listLoading = false
            })
        },
        handleDelete(index, row) {
            EveryDayDelete(row.id).then(response => {
                this.tableData = this.tableData.filter(data => data.id !== row.id)
                this.$message('删除成功')
            })
        },
        isOk() {
            addNotice(this.addData).then(response => {
                this.fetchData()
                this.$message('添加成功')
                this.dialogVisible = false
            })
        }
    },
    created() {
        this.fetchData()
    },
}
</script>

<style lang="scss" scoped>
    .app-container {
        .addButton {
            float: right;
            margin-right: 25px;
        }

        .row-bg {
            .col-title {
                text-align: center;
                line-height: 45px;
            }
        }
    }
</style>