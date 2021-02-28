<template>
  <div>
    <navTab></navTab>
    <el-row :gutter="20" class="content-wrap">
      <el-col :span="3">
        <el-menu
          :default-active="activeIndex"
          class="content-height"
          background-color="#545c64"
          text-color="#fff"
          @select="changeTab"
          active-text-color="#f56c6c">
          <el-menu-item index="productManage">
            <i class="el-icon-box"></i>
            <span slot="title">商品管理</span>
          </el-menu-item>
          <el-menu-item index="staffManage" v-if="userInfo.vipStatus">
            <i class="el-icon-user"></i>
            <span slot="title">人员管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21" class="content-height p4-20 main-content">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import navTab from './components/navTab'
export default {
  components: {
    navTab
  },
  computed: {
    ...mapState({
      activedTab: state => state.activedTab,
      userInfo: state => state.userInfo
    })
  },
  data () {
    return {
      activeIndex: 'productManage'
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let userInfo = sessionStorage.zhongheAdmin ? JSON.parse(sessionStorage.zhongheAdmin) : {}
      this.$store.dispatch('updateUserInfoAction', userInfo)
      if (!userInfo.loginFlag) {
        this.$router.push({name: 'adminLogin'})
      } else {
        this.$store.commit('updateActivedTab', this.$route.name)
        this.activeIndex = this.activedTab
      }
    },
    changeTab (val) {
      console.log('val--菜单', val)
      this.$store.commit('updateActivedTab', val)
      this.$router.push({name: val})
    }
  }
}
</script>

<style lang="less" scoped>
.content-height{
  height: calc(~"100vh - 80px")
}
.main-content{
  overflow-y: scroll;
}
</style>
