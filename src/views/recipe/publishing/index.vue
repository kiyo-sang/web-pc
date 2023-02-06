<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item prop="name" label="名称">
        <el-input v-model="form.name" style="width: 560px;" />
      </el-form-item>
      <el-form-item prop="typeid" label="菜谱类型">
        <!-- <el-select v-model="list" placeholder="请选择菜谱类型">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select> -->
        <el-select ref="selectTree" v-model="valueShow" class="main-select-tree" style="width: 560px;">
          <el-option v-for="item in formatData(datas)" :key="item.value" :label="item.类型名称" :value="item.节点id" style="display: none;" />
          <el-tree
            ref="selecteltree"
            class="main-select-el-tree"
            :data="datas"
            node-key="节点id"
            highlight-current
            :props="defaultProps"
            :current-node-key="form.typeid"
            :expand-on-click-node="expandOnClickNode"
            default-expand-all
            @node-click="handleNodeClick"
          />
        </el-select>
      </el-form-item>

      <el-form-item prop="rawmaterial" label="主要食材">
        <el-input v-model="form.rawmaterial" type="textarea" />
      </el-form-item>

      <el-form-item label="主要调料">
        <el-input v-model="form.flavouring" type="textarea" />
      </el-form-item>

      <el-form-item prop="method" label="主要步骤">
        <el-input v-model="form.method" type="textarea" />
      </el-form-item>

      <el-form-item label="特性">
        <el-input v-model="form.special" style="width: 560px;" />
      </el-form-item>

      <el-form-item label="提示">
        <el-input v-model="form.tips" style="width: 560px;" />
      </el-form-item>

      <el-form-item label="选择图片" prop="file">
        <el-upload
          class="avatar-uploader"
          action=""
          :auto-upload="false"
          :show-file-list="false"
          :on-change="handleChange"
          :before-upload="beforeAvatarUpload"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <div style="font-size: 12px;color: #666;">
          只能上传jpg/png文件,且不超过 2MB,最多上传 9 张图片
        </div>
      </el-form-item>
      <el-form-item>
        <div v-if="form.file !==''" class="img-list">
          <img :src="fileShow" style="height: 100%;">
          <i class="el-icon-delete" @click="handlerDel" />
        </div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">创建</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getMenuTypeList, addMenuByAdmin } from '@/api/menu'

export default {
  data() {
    return {
      valueShow: '家常菜',
      expandOnClickNode: true,
      options: [],
      datas: [],
      defaultProps: {
        children: 'subMenuType',
        label: '类型名称'
      },
      fileShow: '',
      form: {
        name: '',
        rawmaterial: '',
        flavouring: '', // 调料
        method: '',
        special: '',
        tips: '',
        typeid: 44,
        file: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入菜谱名称', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        typeid: [
          { required: true, message: '请输入菜谱类型', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        rawmaterial: [
          { required: true, message: '请输入主要食材', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        method: [
          { required: true, message: '请输入主要步骤', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        file: [
          { required: true, message: '请上传图片', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getMenuTypeList()
  },

  methods: {
    handleChange(file, fileList) {
      this.fileShow = URL.createObjectURL(file.raw)
      this.form.file = file.raw
      //   this.file = fileList
      console.info(this.form)
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      // 判断图片大小
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },

    // 删除图片
    handlerDel() {
      this.form.file = ''
      this.$message.success('删除成功')
    },

    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.form)
          let formData = new FormData()
          formData.append('file', this.form.file)
          formData.append('name', this.form.name)
          formData.append('rawmaterial', this.form.rawmaterial)
          formData.append('flavouring', this.form.flavouring)
          formData.append('method', this.form.method)
          formData.append('special', this.form.special)
          formData.append('file', this.form.file)
          formData.append('tips', this.form.tips)
          formData.append('typeid', this.form.typeid)
          console.log(formData);
          addMenuByAdmin(formData).then(response => {
            console.log(response)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    getMenuTypeList() {
      getMenuTypeList().then(response => {
        this.datas = response.data
        console.log(response.data)
      })
    }, // 四级菜单
    formatData(data) {
      const options = []
      data.forEach((item, key) => {
        options.push({ label: item.类型名称, value: item.节点id })
        if (item.subMenuType) {
          item.subMenuType.forEach((items, keys) => {
            options.push({ label: items.类型名称, value: items.节点id })
            if (items.subMenuType) {
              items.subMenuType.forEach((itemss, keyss) => {
                options.push({ label: itemss.类型名称, value: itemss.节点id })
                if (itemss.subMenuType) {
                  itemss.subMenuType.forEach((itemsss, keysss) => {
                    options.push({ label: itemsss.类型名称, value: itemsss.节点id })
                  })
                }
              })
            }
          })
        }
      })
      return options
    },
    handleNodeClick(node) {
      this.valueShow = node.类型名称
      this.form.typeid = node.节点id
      this.$refs.selectTree.blur()
    }
  }
}
</script>

<style lang="scss">
.line{
  text-align: center;
}
.img-list{
  height: 200px;
  .el-icon-delete {
    font-size: 25px;
  }
}
</style>

