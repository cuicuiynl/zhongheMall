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
          </el-form>
          <span class="login-btn zh-theme-bg2" @click="login" >登录</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '@/common/utils/utils.js'
import companyLogo from '@/components/companyLogo'
const loginUrl = '/zhonghe/user/login'

export default {
  components: { companyLogo },
  name: 'platformLogin',
  data () {
    return {
      ruleForm: {
        phoneNumber: '', // 手机号
        password: '' // 密码
      },
      loginType: 'log',
      rules: {
        phoneNumber: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[345789]\d{9}$/, message: '目前只支持中国大陆的手机号码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '请输入6-12位密码', trigger: 'blur' }
        ]
      }
    }
  },
  init () {
    let userInfo = localStorage.zhongheAdmin ? JSON.parse(localStorage.zhongheAdmin) : null
    if (userInfo) {
      this.$router.push({
        name: 'productManage'
      })
    }
  },
  methods: {
    resetForm () {
      this.$refs['ruleForm'].resetFields()
    },
    login () {
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
          localStorage.setItem('zhongheAdmin', JSON.stringify(userInfo))
          this.$router.push({
            name: 'productManage'
          })
        } else {
          this.$message({
            message: '登录失败',
            type: 'warning'
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.top-nav{
  padding: 16px;
}
.login-warp{
  padding-top: 60px;
  background: #efc7c7;
  height: 560px;
  margin-top: 20px;
}

.login-box{
    position: relative;
    width: 370px;
    margin: 0 auto;
    padding-top: 10px;
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
  padding-bottom: 60px;
}
/deep/.el-form--label-top .el-form-item__label{
  padding: 0;
}
</style>
