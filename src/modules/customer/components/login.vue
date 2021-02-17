<template >
  <div class="login-mask">
    <div class="login-box">
      <span class="close-btn" @click="close"></span>
      <div class="phone-box">
        <p class="title">手机号登录</p>
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
           <template v-if="loginType=='reg'">
            <el-form-item label="推荐人手机号" prop="recommendNum">
              <el-input
                :maxlength="11"
                placeholder="请输入推荐人手机号（选填）"
                class="mb15 mt30"
                clearable
                v-model.trim="ruleForm.recommendNum">
              </el-input>
            </el-form-item>
          </template>
        </el-form>
        <span class="login-btn zh-theme-bg2" @click="loginOrReg" >{{loginType=='log' ? '登录' : '注册'}}</span>
      </div>
      <div class="others-login-wrapper">
        <span v-if="loginType=='reg'" @click="changeLogType('log')"><span class="astyle">账号密码登录</span></span>
        <span v-if="loginType=='log'" >没有账号，点击<span class="astyle" @click="changeLogType('reg')">注册</span></span>
      </div>
    </div>
  </div>
</template>

<script>
const loginUrl = '/nine/user/login'
const registerUrl = '/nine/user/register'
// import { setCookie } from '@/common/utils/utils.js'
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
      ruleForm: {
        recommendNum: '', // 再次输入的密码
        phoneNumber: '', // 手机号
        testNumber: '', // 验证码
        password: '' // 密码
      },
      loginType: 'log',
      rules: {
        phoneNumber: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[345789]\d{9}$/, message: '目前只支持中国大陆的手机号码', trigger: 'blur' }
          // { min: 3, max: 11, message: '长度在11位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '请输入6-12位密码', trigger: 'blur' }
        ],
        recommendNum: [
          { pattern: /^1[345789]\d{9}$/, message: '目前只支持中国大陆的手机号码', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.loginType = this.logType
  },
  methods: {
    changeLogType (val) {
      this.resetForm()
      this.password = ''
      this.loginType = val
    },
    loginOrReg () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if (this.loginType === 'log') {
            this.login()
          } else if (this.loginType === 'reg') {
            this.register()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm () {
      this.$refs['ruleForm'].resetFields()
    },
    login () {
      let params = {
        mobile: this.ruleForm.phoneNumber,
        password: this.ruleForm.password
      }
      this.$ajax(loginUrl, params).then(res => {
        if (res.statusCode === 200) {
          let userInfo = {
            loginFlag: true,
            token: res.objectData.token,
            ...res.objectData.userInfo
          }
          console.log('userInfo==登录', userInfo)
          this.$store.dispatch('updateUserInfoAction', userInfo)
          localStorage.setItem('zhongheUser', JSON.stringify(userInfo))
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
        mobile: this.ruleForm.phoneNumber,
        recommendNum: this.ruleForm.recommendNum,
        password: this.ruleForm.password
      }
      this.$ajax(registerUrl, params).then(res => {
        if (res.statusCode === 200) {
          this.$message({
            message: '注册成功，请登录',
            type: 'warning'
          })
          this.loginType = 'log'
          this.resetForm()
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
      margin-bottom: 10px;
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
  padding-bottom: 60px;
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
/deep/.el-form--label-top .el-form-item__label{
  padding: 0;
}
</style>
