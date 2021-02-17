<template>
  <div class="nav-wrap-wrap">
    <div class="nav-wrap">
        <companyLogo @click="changeTab('goods')"></companyLogo>
        <div class="nav-tab">
            <div class="tab-item"  :class="{'tab-active': item.value == activedTab}"
            @click="changeTab(item.value)"
            v-for="item in tabs" :key="item.value">{{item.label}}</div>
        </div>
        <div class="login-zone">
          <slot name="right"></slot>
        </div>
    </div>
  </div>
</template>

<script>
import companyLogo from '@/components/companyLogo'
import { mapState } from 'vuex'
export default {
  name: 'headerNav',
  components: {
    companyLogo
  },
  props: {
    tabs: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      activedTab: state => state.activedTab
    })
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$store.commit('updateActivedTab', this.$route.name)
      console.log('localStorage.zhongheUser==?', localStorage.zhongheUser)
      // {loginFlag: true}
      let userInfo = localStorage.zhongheUser ? JSON.parse(localStorage.zhongheUser) : {}
      console.log('userInfo===导航栏初始化', userInfo)
      this.$store.dispatch('updateUserInfoAction', userInfo)
    },
    changeTab (val) {
      this.$store.commit('updateActivedTab', val)
      console.log('点击点击tab', val)
      this.$router.push({name: val})
    }
  }
}
</script>

<style lang="less" scoped>
.nav-wrap-wrap{
  position: fixed;
  top:0;
  width: 1190px;
  background: #fff;
  z-index: 99;
}
.nav-wrap{
    max-width: 1190px;
    height: 80px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 10px;
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
        // background: #14a8bd;
        background: #B12020;;
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
      background: #B12020;;
      // background: #14a8bd;
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
    right: 10px;
}
</style>
