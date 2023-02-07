<template>
    <div class="app-container">
        <el-tabs v-model="activeName">
            <el-tab-pane label="审批列表" name="first">
                <el-table
                    :data="tableData"
                    v-loading="listLoading"
                    style="width: 100%">
                    <el-table-column
                        type="index"
                        width="60"
                        label="序号"
                        align="center"
                    />
                    <el-table-column align="center" label="id" prop="id" width="80" />
                    <el-table-column align="center" label="主图">
                        <template slot-scope="scope">
                        <img v-if="scope.row.mainimage === null ||scope.row.mainimage === ''" src="https://img95.699pic.com/xsj/0c/oj/94.jpg%21/fw/700/watermark/url/L3hzai93YXRlcl9kZXRhaWwyLnBuZw/align/southeast" height="45px">
                        <img v-else :src="scope.row.mainimage" height="45px" referrerpolicy="no-referrer">
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="菜谱名称" prop="name" width="110" />
                    <el-table-column align="center" label="菜谱类型" width="150">
                        <template slot-scope="scope">
                            <span>{{ TypeName(scope.row.typeid) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="主要食材" prop="rawmaterial" width="200" />
                    <el-table-column align="center" label="主要调料" prop="flavouring" width="200" />
                    <el-table-column align="center" label="主要步骤" prop="method" width="200" />
                    <el-table-column align="center" label="特性" prop="special" width="200" />
                    <el-table-column align="center" label="提示" prop="tips" width="200" />
                    <el-table-column
                        label="创建日期"
                        width="180"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <i v-if="scope.row.createtime" class="el-icon-time"></i>
                            <span style="margin-left: 10px" v-if="scope.row.createtime">{{new Date(scope.row.createtime).toLocaleString()}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" fixed="right"  width="160">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            type="success"
                            @click="pass(scope.row.id)">通过</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="fail(scope.row.id)">驳回</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="未通过列表" name="second">
                未通过列表
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { ApprovalList,passOne,failOne } from "@/api/approval";
import { getMenuTypeList } from '@/api/menu'

    export default {
        data() {
            return {
                activeName: 'first',
                dialogVisible: false,
                tableData: [],
                menuTypeList: [], //类型列表
            }
        },
        created() {
            this.getMenuTypeList()
            this.fetchData()
        },
        methods: {
            fail(id) {
                failOne(id).then(response => {
                    this.$message('已成功！')
                    this.tableData = this.tableData.filter(item => item.id !== id)
                })
            },
            pass(id) {
                passOne(id).then(response => {
                    this.$message('已成功审批！')
                    this.tableData = this.tableData.filter(item => item.id !== id)
                })
            },
            fetchData() {
                this.listLoading = true
                ApprovalList().then(response => {
                    this.tableData = response.data
                    this.listLoading = false
                })
            },
            getMenuTypeList() {
                getMenuTypeList().then(response => {
                    this.menuTypeList = this.expansion(response.data)
                })
            },
            expansion(data, list = []) {
                data.forEach(item => {
                    list.push({name: item.类型名称, id: item.节点id})
                    if(item.subMenuType && item.subMenuType.length !== 0) {
                        this.expansion(item.subMenuType, list)
                    }
                });
                return list
            },
            TypeName(typeid) {
                const data = this.menuTypeList.filter(item => item.id === typeid)[0]
                let name = '错误类型...'
                if(data) {
                    name = data.name
                }
                return name
            },
        },
    }
</script>

<style lang="scss">

</style>