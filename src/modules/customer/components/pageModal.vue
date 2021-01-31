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

<style>

</style>
