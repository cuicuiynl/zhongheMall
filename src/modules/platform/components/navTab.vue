<template>
  <div class="nav-wrap">
    <companyLogo class="log-style"></companyLogo>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="rgb(251 109 109)">
      <el-menu-item index="1">商品管理中心</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import companyLogo from '@/components/companyLogo'
export default {
  name: 'navTab',
  components: { companyLogo },
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style>
  .nav-wrap{
    background: rgb(84, 92, 100);
    padding: 5px 16px;
    display: flex;
  }
  .log-style{
    border-radius: 5px;
    margin-right: 16px;
  }
  /* @media screen and (min-width:1190px){
    .nav-width {
      width: 1190px;
      margin: 0 auto;
    }
  } */
</style>
