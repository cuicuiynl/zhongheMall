<template>
  <div>
    <div class="page-width">
      <headerNavMall></headerNavMall>
      <slot name="pageContent"></slot>
    </div>
    <connectUs></connectUs>
    <pageFooter></pageFooter>
  </div>
</template>

<script>
import headerNavMall from './headerNavMall'
import pageFooter from './pageFooter'
import connectUs from './connectUs'
export default {
  name: 'pageModal',
  components: {
    headerNavMall,
    pageFooter,
    connectUs
  }
}
</script>

<style lang="less" scoped>
.page-width {
  margin: 0 auto;
  padding-top: 80px;
  min-height: 670px;
  // min-height: calc('100vh-400px');
}
@media screen and (min-width:1190px){
 .page-width {
   width: 1190px;
  }
}
</style>
