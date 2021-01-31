<template>
  <div class="pannel-wrap">
    <p class="pannel-title">{{title}}</p>
    <div class="pannel-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pannel',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.pannel-wrap{
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.pannel-title{
  padding: 16px 24px;
  border-bottom: 1px solid #ddd;
  font-size: 16px
}
.pannel-content{
  padding: 24px;
}
</style>
