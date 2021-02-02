<template >
  <div class="login-mask">
    <div class="login-box">
      <span class="close-btn" @click="close"></span>
      <div class="phone-box">
        <p class="title">手机号登录</p>
        <p class="txt-phone">手机号</p>
        <el-input
          :maxlength="11"
          placeholder="请输入手机号"
          class="mb15 mt30"
          clearable
          v-model="phoneNumber">
        </el-input>
        <template v-if="loginType=='reg'">
          <!-- <p class="item-label">验证码</p>
          <el-input
            placeholder="验证码"
            class="mb15 mt30"
            v-model="testNumber">
          </el-input> -->
          <p class="item-label">密码</p>
          <el-input
            class="mb15 mt30"
            placeholder="请输入密码"
            type="password"
            v-model="password">
          </el-input>
          <p class="item-label">推荐人手机号</p>
          <el-input
            class="mb15 mt30"
            placeholder="请输入推荐人手机号（选填）"
            type="password"
            v-model="password2">
          </el-input>
        </template>
        <template v-if="loginType=='log'">
          <p class="item-label">密码</p>
          <el-input
            class="mb15 mt30"
            type="password"
            v-model="password">
          </el-input>
        </template>
        <span class="login-btn zh-theme-bg2" @click="loginOrReg" >{{loginType=='log' ? '登录' : '注册'}}</span>
      </div>
      <div class="others-login-wrapper">
        <span v-if="loginType=='reg'" @click="loginType = 'log'; password = ''"><span class="astyle">账号密码登录</span></span>
        <span v-if="loginType=='log'" >没有账号，点击<span class="astyle" @click="loginType = 'reg'; password = ''">注册</span></span>
      </div>
    </div>
  </div>
</template>

<script>
const loginUrl = '/nine/user/register/login'
const registerUrl = '/nine/user/register/register'
export default {
  name: 'login',
  props: {
    logType: {
      type: String,
      default: 'log'
    }
  },
  data () {
    return {
      loginType: 'log',
      password2: '', // 再次输入的密码
      phoneNumber: '', // 手机号
      testNumber: '', // 验证码
      password: '' // 密码
    }
  },
  mounted () {
    this.loginType = this.logType
  },
  methods: {
    loginOrReg () {
      if (this.loginType === 'log') {
        this.login()
      } else if (this.loginType === 'reg') {
        this.register()
      }
    },
    login () {
      let params = {
        mobile: this.phoneNumber,
        password: this.password
      }
      this.$ajax(loginUrl, params).then(res => {
        if (res.statusCode === 200) {
          let userInfo = {
            loginFlag: true
          }
          this.$store.dispatch('userInfo', userInfo)
          this.close()
        } else {
          this.$message({
            message: '登录失败',
            type: 'warning'
          })
        }
      })
    },
    register () {
      let params = {
        mobile: this.phoneNumber,
        recommend: this.recommend,
        password: this.password
      }
      this.$ajax(registerUrl, params).then(res => {
        if (res.statusCode === 200) {
          this.loginType = 'reg'
        } else {
          this.$message({
            message: '注册失败',
            type: 'warning'
          })
        }
      })
    },
    close () {
      this.$emit('closeLogin')
    }
  }
}
</script>

<style scoped lang="less">
.astyle{
  color: #1890ff;
  cursor: pointer;
}
.login-mask{
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(0,0,0,.4);
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1.4;
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,"\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
}
.login-box{
    position: relative;
    width: 370px;
    min-height: 294px;
    background: #fff;
    border-radius: 10px;
    .title{
      font-size: 20px;
      font-weight: 500;
      color: #000;
      margin-top: 30px;
    }
    .txt-phone{
      margin-top: 30px;
      margin-bottom: 8px;
      font-size: 12px;
      color: #333;
    }
    .item-label{
      margin: 15px 0 8px;
      font-size: 12px;
      color: #333;
    }
    .login-btn{
      display: inline-block;
      width: 310px;
      height: 42px;
      margin-top: 30px;
      border-radius: 10px;
      color: #fff;
      text-align: center;
      line-height: 42px;
      cursor: pointer;
    }
}
.close-btn{
  position: absolute;
    right: 30px;
    top: 37px;
    width: 15px;
    height: 15px;
    background: url('~@/assets/closeIcon.png') no-repeat;
    background-size: 100%;
    z-index: 2;
    cursor: pointer;
}
.phone-box{
  position: relative;
  width: 310px;
  margin: 0 auto;
  padding-bottom: 110px;
}
.others-login-wrapper{
  position: absolute;
  width: 100%;
  bottom: 30px;
  display: flex;
  padding: 0 30px;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: #666;
}
</style>
