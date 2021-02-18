<template>
  <div class="pt20">
    <pageModal>
      <div slot="pageContent">
        <el-tabs v-model="activeName" type="card" @tab-click="changeTab">
          <!-- <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
          <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
          <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane> -->
          <el-tab-pane :label="item.label" :name="item.value" v-for="item in tabs" :key="item.value"></el-tab-pane>
        </el-tabs>
        <router-view/>
      </div>
    </pageModal>
  </div>
</template>

<script>
import pageModal from '../components/pageModal'
export default {
  name: 'user',
  components: {
    pageModal
  },
  data () {
    return {
      activeName: '',
      tabs: [
        {value: 'account', label: '用户中心'},
        {value: 'myOrder', label: '我的订单'},
        {value: 'shoppingCard', label: '购物车'},
        {value: 'collects', label: '我的收藏'}
      ]
    }
  },
  mounted () {
    this.activeName = this.$route.name
    // this.$store.commit('updateActivedTab', this.$route.name)
  },
  methods: {
    changeTab (val) {
      console.log('val===', val.name)
      this.$router.push({name: val.name})
    }
  }
}
</script>

<style>

</style>
