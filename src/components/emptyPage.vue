<template>
  <div shadow='never' class='center empty-page'>
    <img :src="imgUrl">
    <p class="text-style">{{emptyText}}</p>
  </div>
</template>

<script>
export default {
  name: 'emptyPage',
  props: {
    imgUrl: {
      type: String,
      default: '/static/imgs/empty-patent.png'
    },
    emptyText: {
      type: String,
      default: '暂无结果'
    }
  }
}
</script>

<style lang="less" scoped>
.empty-page{
  padding: 30px 0;
}
.text-style{
  color: rgba(0,0,0,.25);
  font-size: 14px;
}
</style>
