<template>
  <div>
    <div class="top-nav">
      <companyLogo class="mr20 "></companyLogo>
      欢迎登录
    </div>
    <div class="login-warp">
      <div class="login-box">
        <div class="phone-box">
          <p class="title">欢迎登录中禾专利管理平台</p>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-position="top">
            <el-form-item label="手机号" prop="phoneNumber">
              <el-input
                :maxlength="11"
                placeholder="请输入手机号"
                class="mb15 mt30"
                clearable
                v-model.trim="ruleForm.phoneNumber">
              </el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code" v-if="loginType === 'forget'">
              <div class="flex-between-center">
                <el-input
                  :maxlength="11"
                  placeholder="请输入验证码"
                  class="mb15 mt30 mr10"
                  clearable
                  v-model.trim="ruleForm.code">
                </el-input>
                <el-button class="code-btn" type="default" size="small" @click="getCode" :disabled="showCountDown">
                  <span v-if="showCountDown">{{countDownNum}}S</span>
                  <span v-else>发送验证码</span>
                </el-button>
              </div>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input
                  :maxlength="12"
                  placeholder="请输入密码"
                  class="mb15 mt30"
                  type="password"
                  clearable
                  v-model.trim="ruleForm.password">
                </el-input>
              </el-form-item>
              <el-form-item label="密码确认" prop="password2" v-if="loginType === 'forget'">
                <el-input
                  :maxlength="12"
                  placeholder="请再次输入密码"
                  class="mb15 mt30"
                  type="password"
                  clearable
                  v-model.trim="ruleForm.password2">
                </el-input>
              </el-form-item>
          </el-form>
          <p class="login-btn zh-theme-bg2 mb20" @click="logBtn" >{{btnText}}</p>
          <span class="astyle" @click="forgetPWD" v-if="loginType === 'log'">忘记密码</span>
          <span class="astyle" @click="backLogin" v-if="loginType === 'forget'">登录</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '@/common/utils/utils.js'
import companyLogo from '@/components/companyLogo'
const loginUrl = '/zhonghe/user/login'
const getCode = '/zhonghe/user/sendCode'
const updatePwd = 'zhonghe/user/updatePwd'

export default {
  components: { companyLogo },
  name: 'platformLogin',
  data () {
    return {
      btnText: '登录',
      ruleForm: {
        phoneNumber: '', // 手机号
        password: '', // 密码
        password2: '', // 密码确认
        code: '' // 验证码
      },
      showCountDown: false,
      countDownNum: 60,
      loginType: 'log',
      rules: {
        phoneNumber: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[345789]\d{9}$/, message: '目前只支持中国大陆的手机号码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '请输入6-12位密码', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '请输入再次输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '请输入6-12位密码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    let userInfo = sessionStorage.zhongheAdmin ? JSON.parse(sessionStorage.zhongheAdmin) : null
    let userInfoLocal = localStorage.zhongheAdmin ? JSON.parse(localStorage.zhongheAdmin) : null
    if (userInfoLocal) {
      this.ruleForm.phoneNumber = userInfoLocal.mobile
      this.ruleForm.password = utils.decrypt(userInfoLocal.password)
    }
    if (userInfo) {
      this.$router.push({
        name: 'productManage'
      })
    }
  },
  methods: {
    updatePWD () {
      if (this.ruleForm.password === this.ruleForm.password2) {
        this.$message.error('两次密码输入不一致')
        return
      }
      let params = {
        mobile: this.ruleForm.phoneNumber,
        password: utils.encrypt(this.ruleForm.password),
        code: this.ruleForm.code
      }
      this.$ajax(updatePwd, params).then(res => {
        if (res.statusCode === 200) {
          this.$message.success('修改成功')
          this.backLogin()
        }
      })
    },
    confirmLogin () {
      let params = {
        mobile: this.ruleForm.phoneNumber,
        password: utils.encrypt(this.ruleForm.password)
      }
      this.$ajax(loginUrl, params).then(res => {
        if (res.statusCode === 200) {
          let userInfo = {
            loginFlag: true,
            token: res.objectData.token,
            ...res.objectData.userInfo
          }
          this.$store.dispatch('updateUserInfoAction', userInfo)
          sessionStorage.setItem('zhongheAdmin', JSON.stringify(userInfo))
          localStorage.setItem('zhongheAdmin', JSON.stringify(params))
          this.$router.push({
            name: 'productManage'
          })
        }
      })
    },
    logBtn () {
      console.log('this.ruleForm.password', this.ruleForm.password)
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.loginType === 'log' ? this.confirmLogin() : this.updatePWD()
        }
      })
    },
    countDown () {
      this.timer && clearInterval(this.timer)
      this.timer = setInterval(() => {
        if (this.countDownNum > 0) {
          this.countDownNum -= 1
        } else {
          this.showCountDown = false
        }
      }, 1000)
    },
    getCode () {
      this.$refs['ruleForm'].validateField('phoneNumber', error => {
        if (!error) {
          this.confirmGetCode()
        }
        //  else {
        //   return false;
        // }
      })
    },
    confirmGetCode () {
      console.log('this.ruleForm.password', this.ruleForm.password)
      this.showCountDown = true
      this.countDown()
      let params = {
        mobile: this.ruleForm.phoneNumber
      }
      this.$ajax(getCode, params).then(res => {
        if (res.statusCode === 200) {
          // this.$message.success(res.objectData)
          this.showCountDown = true
          this.countDown()
        }
      })
    },
    backLogin () {
      this.loginType = 'log'
      this.btnText = '登录'
      this.resetForm()
    },
    resetForm () {
      this.$refs['ruleForm'].resetFields()
    },
    forgetPWD () {
      this.loginType = 'forget'
      this.btnText = '重置密码'
      this.resetForm()
    }
  },
  destroyed () {
    this.timer && clearInterval(this.timer)
  }
}
</script>

<style scoped lang="less">
.top-nav{
  padding: 16px;
}
.login-warp{
  padding-top: 60px;
  padding-bottom: 60px;
  background: #efc7c7;
  min-height: 560px;
  margin-top: 20px;
}
.code-btn{
  width: 92px;
}
.login-box{
    position: relative;
    width: 370px;
    margin: 0 auto;
    min-height: 294px;
    background: #fff;
    border-radius: 10px;
    .title{
      padding-top: 10px;
      font-size: 20px;
      font-weight: 500;
      color: #403f3f;
      margin-top: 30px;
      margin-bottom: 10px;
      text-align: center;
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
      margin-top: 10px;
      border-radius: 10px;
      color: #fff;
      text-align: center;
      line-height: 42px;
      cursor: pointer;
    }
}
.phone-box{
  position: relative;
  width: 310px;
  margin: 0 auto;
  padding-bottom: 20px;
}
/deep/.el-form--label-top .el-form-item__label{
  padding: 0;
}
</style>
