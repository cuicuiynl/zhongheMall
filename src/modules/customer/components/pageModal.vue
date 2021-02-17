<template>
  <div>
    <div class="page-width">
      <headerNavMall></headerNavMall>
      <slot name="pageContent"></slot>
    </div>
    <pageFooter></pageFooter>
  </div>
</template>

<script>
import headerNavMall from './headerNavMall'
import pageFooter from './pageFooter'
export default {
  name: 'pageModal',
  components: {
    headerNavMall,
    pageFooter
  }
}
</script>

<style lang="less" scoped>
.page-width {
  margin: 0 auto;
  padding-top: 60px;
  min-height: 670px;
  // min-height: calc('100vh-400px');
}
@media screen and (min-width:1190px){
 .page-width {
   width: 1190px;
  }
}
</style>
