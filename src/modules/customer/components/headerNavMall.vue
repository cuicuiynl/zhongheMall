<template>
  <div class="mb20">
    <header-nav
      :tabs="tabs"
    >
      <template slot="right" >
        <template v-if="userInfo.loginFlag">
            <div class="my-order">我的订单</div>
            <span class="split-line"></span>
            <div class="head-pic">
                <div class="info-wrap-out">
                  <div class="info-wrap">
                    <div class="head-item" v-for="item in userSelectors" :key="item.value">
                       <span class="head-item-icon" :class="`${item.value}-icon`"></span> {{item.label}}
                    </div>
                    <div class="logout-btn" @click="logout">安全退出</div>
                  </div>
                </div>
            </div>
            </template>
            <template v-else>
            <div class="login-btn">
                <span class="log" @click="login('log')">登录</span>
                <span class="reg" @click="login('reg')">免费注册</span>
            </div>
        </template>
      </template>
    </header-nav>
    <login v-if="showLogin" :logType="logType" @closeLogin="closeLogin"></login>
  </div>
</template>

<script>
import headerNav from './headerNav'
import login from './login'
import { mapState } from 'vuex'
export default {
  name: 'headerNavMall',
  components: {
    headerNav,
    login
  },
  props: {
  },
  data () {
    return {
      tabs: [
        {value: 'goods', label: '首页'},
        {value: 'goodsList', label: '专利市场'}
      ],
      userSelectors: [
        {value: 'orders', label: '我的订单'},
        {value: 'collects', label: '我的收藏'},
        {value: 'accountManage', label: '账户管理'}
      ],
      showLogin: false,
      logType: ''
    }
  },
  mounted () {
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    })
  },
  methods: {
    // 打开登陆窗口
    login (val) {
      this.showLogin = true
      this.logType = val
    },
    // 关闭登陆窗口
    closeLogin () {
      this.showLogin = false
    },
    // 登出
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style lang="less" scoped>
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
.head-pic{
    position: relative;
    z-index: 1000;
    float: right;
    width: 46px;
    height: 46px;
    border-radius: 23px;
    background: #eee;
    &:hover{
        .info-wrap-out{
            display: block;
        }
    }
}
.info-wrap-out{
    display: none;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 50%;
    width: 148px;
    z-index: 9999;
    transform: translate(50%);
}
.info-wrap{
    position: relative;
    top: 50px;
    background: #fff;
    padding-top: 8px;
    padding-bottom: 5px;
    box-shadow: 0 0 35px 0 rgba(0, 0, 0, .04);
}
.head-item{
    padding: 0 20px;
    transition: .4s;
    &:hover{
        background: #f0f9f9;
    }
}
.head-item-icon{
    display: inline-block;
    background: #ddd;
    width: 14px;
    height: 14px;
    margin-right: 12px;
    position: relative;
    top: 2px;
}
.logout-btn{
   border-top:1px solid #ddd;
   padding-top: 5px;
   margin: 0 20px;
   text-align: center;
}
</style>
