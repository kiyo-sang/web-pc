<template>
  <div>
    <div class="navbar">
      <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

      <breadcrumb class="breadcrumb-container" />

      <div class="right-menu">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
            <el-avatar> {{ name }} </el-avatar>
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
          
              <el-dropdown-item @click.native="dialogVisible = true">修改密码</el-dropdown-item>
            <router-link to="/">
              <el-dropdown-item>
                首页
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <!-- <span>这是一段信息</span> -->

      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="6"><div class="grid-content">旧密码</div></el-col>
        <el-col :span="10"><el-input placeholder="请输入密码" v-model="passWord.pwd" show-password></el-input></el-col>

      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="6"><div class="grid-content">新密码</div></el-col>
        <el-col :span="10"><el-input placeholder="请输入密码" v-model="passWord.newPwd" show-password></el-input></el-col>

      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="isOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { updatePwd } from '@/api/user'

export default {
  computed: {
    ...mapGetters([
      'sidebar',
      // 'name'
    ]),
    name() {
      return this.$store.state.user.name
    }
  },
  data() {
      return {
        dialogVisible: false,
        passWord: {
          pwd: '',
          newPwd:'',
          username: this.$store.state.user.name
        }
      };
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  
  methods: {
 
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    isOk(){
      if(this.passWord.pwd===''||this.passWord.newPwd==='') {
        this.$message.error('密码不能为空！')
      } else if (this.passWord.pwd===this.passWord.newPwd) {
        this.$message.error('密码不能相同！')
      }
       else {
        updatePwd(this.passWord).then((data) => {
          this.dialogVisible = false
          this.$message('修改成功！')
        }).catch(error => {
        })
      }
      
      
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}

.row-bg{
  margin-top: 10px;

  .grid-content{
  line-height: 40px;
    text-align: right;
    padding-right: 10px;
  }
}


</style>
