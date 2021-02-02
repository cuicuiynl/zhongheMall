<template>
  <div class="mb20">
    <header-nav
      :tabs="tabs"
    >
      <template slot="right" >
        <template v-if="userInfo.loginFlag">
            <div class="my-order zh-a-theme" @click="go('myOrder')">我的订单</div>
            <span class="split-line"></span>
            <div class="head-pic">
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
            </div>
            </template>
            <template v-else>
            <div class="login-btn">
                <span class="log" @click="login('log')">登录</span>
                <span class="reg zh-theme-bg2" @click="login('reg')">免费注册</span>
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
        {value: 'account', label: '账户管理', icon: 'el-icon-user'},
        {value: 'myOrder', label: '我的订单', icon: 'el-icon-tickets'},
        {value: 'shoppingCard', label: '购物车', icon: 'el-icon-shopping-cart-2'},
        {value: 'collects', label: '我的收藏', icon: 'el-icon-star-off'}
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
    // 我的订单
    go (val) {
      this.$router.push({name: val})
    },
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
    // background: #199fff;
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
    font-size: 20px;
    text-align: center;
    line-height: 16px;
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
    font-size: 14px;
    top: 0;
    right: 50%;
    width: 148px;
    z-index: 999;
    transform: translate(50%);
}
.info-wrap{
    position: relative;
    top: 50px;
    background: #fff;
    padding-top: 8px;
    padding-bottom: 5px;
    box-shadow: 0 0 35px 0 rgba(0, 0, 0, .04);
    .lable-style{
      display: inline-block;
      width: 80px;
    }
}
.head-item{
    padding: 10px;
    transition: .4s;
    &:hover{
        background: #f0f9f9;
    }
}
.head-item-icon{
    display: inline-block;
    width: 14px;
    height: 14px;
    font-size: 15px;
    margin-right: 12px;
    position: relative;
    top: 2px;
}
.logout-btn{
   border-top:1px solid #ddd;
   margin-top: 5px;
   padding: 10px 20px;
   text-align: center;
}
</style>
