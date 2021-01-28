<template>
  <div>
    <div class="nav-wrap">
        <companyLogo></companyLogo>
        <div class="nav-tab">
            <div class="tab-item"  :class="{'tab-active': item.value == activedTab}"
            @click="changeTab(item.value)"
            v-for="item in tabs" :key="item.value">{{item.label}}</div>
        </div>
        <div class="login-zone">
          <div class="my-order">我的订单</div>
          <span class="split-line"></span>
          <div class="login-btn">
            <span class="log" @click="login('log')">登录</span>
            <span class="reg" @click="login('reg')">免费注册</span>
          </div>
        </div>
    </div>
    <login v-if="showLogin" :logType="logType" @closeLogin="closeLogin"></login>
  </div>
</template>

<script>
import companyLogo from './companyLogo'
import login from './login'
export default {
  name: 'headerNav',
  components: {
    companyLogo,
    login
  },
  props: {
    actived: {
      type: String,
      default: 'goods'
    }
  },
  data () {
    return {
      tabs: [
        {value: 'goods', label: '首页'},
        {value: 'goodsList', label: '专利市场'}
      ],
      activedTab: 'goods',
      showLogin: false,
      logType: ''
    }
  },
  mounted () {
    this.activedTab = this.actived
  },
  methods: {
    changeTab (val) {
      this.activedTab = val
    },
    login (val) {
      this.showLogin = true
      this.logType = val
    },
    closeLogin () {
      this.showLogin = false
    }
  }
}
</script>

<style lang="less" scoped>
.nav-wrap{
    width: 1190px;
    height: 80px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    position: relative;
}
.nav-tab{
    display: flex;
    margin-left: 20px;
    height: 40px;
    .tab-item{
      padding: 0 20px;
      font-size: 16px;
      font-weight: 400;
      color: #333;
      text-align: center;
      line-height: 40px;
      cursor: pointer;
      position: relative;
    }
    .tab-item:hover{
      &::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 4px;
        background: #199fff;
        border-radius: 3px;
        left: 50%;
        transform: translateX(-50%);
        bottom: 3px;
    }
    }
    .tab-active{
      color: #333;
      font-weight: 500;
      position: relative;
    }
    .tab-active::after {
      content: '';
      position: absolute;
      width: 20px;
      height: 4px;
      background: #199fff;
      border-radius: 3px;
      left: 50%;
      transform: translateX(-50%);
      bottom: 3px;
  }
}
.login-zone{
    display: flex;
    align-items: center;
    color: #666;
    font-size: 14px;
    line-height: 40px;
    position: absolute;
    right: 0;
    .my-order{
      cursor: pointer;
    }
    .split-line{
      width: 2px;
      height: 14px;
      background: #eee;
      border-radius: 1px;
      margin: 0 15px;
    }
    .login-btn{
      margin: 0;
      display: flex;
    }
    .log{
      cursor: pointer;
    }
    .reg{
      width: 96px;
      height: 40px;
      color: #fff;
      text-align: center;
      background: #199fff;
      border-radius: 23px;
      margin-left: 15px;
      cursor: pointer;
    }
}
</style>
