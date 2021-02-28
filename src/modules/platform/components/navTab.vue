<template>
  <div class="nav-wrap flex-between-center">
    <companyLogo class="log-style"></companyLogo>
    <div class="head-pic">
      <el-popover
      placement="bottom"
      width="60"
      trigger="hover">
        <i slot="reference" class="el-icon-user"></i>
        <div>
          <div class="logout-btn" @click="logout">安全退出</div>
        </div>
      </el-popover>
    </div>
    <!-- <div class="head-pic">
      <i class="el-icon-user-solid" style="margin-top:12px;"></i>
        <div class="info-wrap-out">
          <div class="info-wrap">
            <div class="head-item" v-for="item in userSelectors" :key="item.value" @click="go(item.value)">
                <span class="head-item-icon zh-theme" >
                  <i :class="item.icon"></i>
                </span> <span class="lable-style">{{item.label}}</span>
            </div>
            <div class="logout-btn" @click="logout">安全退出</div>
          </div>
        </div>
    </div> -->
  </div>
</template>

<script>
import companyLogo from '@/components/companyLogo'
const URL_LOGOUT = '/zhonghe/user/logout'
export default {
  name: 'navTab',
  components: { companyLogo },
  data () {
    return {
    }
  },
  methods: {
    // 登出
    logout () {
      this.$ajax(URL_LOGOUT).then((res) => {
        console.log('res===', res)
        if (res.statusCode === 200) {
          this.$router.push({name: 'adminLogin'})
          this.$message({
            message: '退出成功',
            type: 'success'
          })
          window.sessionStorage.removeItem('zhongheAdmin')
          this.$store.dispatch('updateUserInfoAction', { loginFlag: false })
        } else {
          this.$message({
            message: '退出失败',
            type: 'warning'
          })
        }
      }).catch(
        (err) => {
          console.log('err-logout-管理端', err)
          this.$message({
            message: '服务器连接失败',
            type: 'warning'
          })
        }
      )
    }
  }
}
</script>

<style lang="less" scoped>
  .nav-wrap{
    background: rgb(84, 92, 100);
    padding: 5px 16px;
    display: flex;
  }
  .log-style{
    border-radius: 5px;
    margin-right: 16px;
  }
  .head-pic{
    width: 30px;
    height:30px;
    background: #ddd;
    text-align: center;
    line-height: 35px;
    border-radius: 50%;
    margin-right: 40px;
    .el-icon-user{
      font-size: 20px;
    }
  }
  .logout-btn{
   margin-top: 5px;
   text-align: center;
   text-align: center;
   cursor: pointer;
   color: #999;
   &:hover{
     color: #1890ff;
   }
}
</style>
