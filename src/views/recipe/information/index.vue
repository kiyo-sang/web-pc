<template>
  <div class="app-container">
    <el-upload
      action=""
      class="avatar-uploader"
      :auto-upload="false"
      :limit="1"
      :before-upload="beforeUpload"
      list-type="picture-card"
      :on-change="handleChange"
      :on-preview="handlePictureCardPreview"
      :disabled="disabled"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      :show-file-list="false"
    >
      <div slot="file" slot-scope="{file}">
        <img :src="imageUrl" class="avatar el-upload-list__item-thumbnail">
        <i class="el-icon-plus avatar-uploader-icon" />
        <span class="el-upload-list__item-actions">
          <span
            v-if="imageUrl"
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in" />
          </span>
          <span
            v-if="imageUrl"
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
          >
            <i class="el-icon-download" />
          </span>
          <span
            v-if="imageUrl"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete" />
          </span>
        </span>
      </div>
    </el-upload>
    <div style="font-size: 12px;color: #666;">
      只能上传jpg/png文件,且不超过 2MB,最多上传 9 张图片
    </div>
  </div></template>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<script>
export default {
  data() {
    return {
      dialogImageUrl: '', // 窗口预览图片路径
      dialogVisible: false, // 预览窗口是否打开
      disabled: false, // 是否禁用上传操作
      imageUrl: ''
    }
  },
  methods: {
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    handleRemove(file, fileList) {
      this.imageUrl = URL.createObjectURL(file.raw)
      console.info(this.form)
    },
    handleChange(file, fileList) {
      this.imageUrl = URL.createObjectURL(file.raw)
      //   this.files = fileList
      console.info(this.form)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleExceed() {
      this.$message.error('chao')
    }

  }
}
</script>
