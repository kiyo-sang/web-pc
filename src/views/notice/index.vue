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
            <el-table-column align="center" label="内容" prop="content" width="1300"/>
            <el-table-column
                label="创建日期"
                width="210"
                align="center"
            >
                <template slot-scope="scope">
                    <i v-if="scope.row.createtime" class="el-icon-time"></i>
                    <span style="margin-left: 10px" v-if="scope.row.createtime">{{new Date(scope.row.createtime).toLocaleString()}}</span>
                </template>
            </el-table-column>
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
            <el-col :span="20"><el-input placeholder="请输入公告内容" v-model="addData.content" type="textarea"></el-input></el-col>

        </el-row>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="isOk">确 定</el-button>
        </span>
        </el-dialog>
    </div>
    
</template>

<script>
import { noticeList, deleteNotice, addNotice } from "@/api/admin";

export default {
    data() {
        return {
            dialogVisible: false,
            tableData: [],
            addData: {
                uid: this.$store.state.user.id,
                content: ''
            }
        }
    },
    methods: {
        fetchData() {
            this.listLoading = true
            noticeList().then(response => {
                this.tableData = response.data
                this.listLoading = false
            })
        },
        handleDelete(index, row) {
            deleteNotice(row.id).then(response => {
                this.tableData = this.tableData.filter(data => data.id !== row.id)
                this.$message('删除成功')
            })
        },
        isOk() {
            console.log(this.addData);
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