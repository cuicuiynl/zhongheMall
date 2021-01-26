<template>
  <div class="login-page">
    <div class="login-header">
      <companyLogo></companyLogo>
      <span>专利市场</span>
    </div>
    <div class="login-body">
      <div style="width:480px;"></div>
      <div class="pannel">
        <el-tabs v-model="loginType" @tab-click="handleChangeTab">
          <el-tab-pane label="账号密码登录" name="account">
            <el-input
              class="mb15 mt30"
              placeholder="请输入手机号"
              prefix-icon="el-icon-search"
              v-model="phoneNumber">
            </el-input>
            <el-input
              type="password"
              placeholder="请输入密码"
              prefix-icon="el-icon-search"
              v-model="password">
            </el-input>
          </el-tab-pane>
          <el-tab-pane label="手机动态登录" name="phone">
            <el-input
              class="mb15 mt30"
              placeholder="请输入手机号"
              prefix-icon="el-icon-search"
              v-model="phoneNumber">
            </el-input>
            <el-input
              placeholder="验证码"
              prefix-icon="el-icon-search"
              v-model="phoneNumber">
            </el-input>
          </el-tab-pane>
        </el-tabs>
        <el-button type="info" class="mt30 mb15 login-btn">登录</el-button>
        <div class="flex-between tips-line">
          <span>还没有账号，<span class="astyle">立即注册</span></span>
          <span class="astyle">忘记密码</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import companyLogo from './companyLogo'
export default {
  name: 'login',
  components: {
    companyLogo
  },
  data () {
    return {
      loginType: 'account',
      phoneNumber: '',
      password: ''
    }
  },
  methods: {
    handleChangeTab (val) {
      console.log('handleChangeTab--val', val)
    }
  }
}
</script>

<style scoped lang="less">
.mt30{
  margin-top: 30px;
}
.mb20{
  margin-bottom: 20px;
}
.mb15{
  margin-bottom: 15px;
}
.astyle{
  color: #1890ff;
  cursor: pointer;
}
.flex-between{
  display: flex;
  justify-content: space-between;
}
.login-header{
  padding: 16px;
}
.login-body{
  background: orange;
  padding: 30px;
  display: flex;
  justify-content: center;
}
.pannel{
  background: #fff;
  border-radius: 10px;
  padding: 25px;
  width: 280px;
}
.login-btn{
  width: 100%;
  letter-spacing: 2px;
}
.tips-line{
  font-size: 12px;
}
// .input-width1{
//   width: 280px;
// }
</style>
