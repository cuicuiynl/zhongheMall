<template>
  <div>
    <el-card shadow="hover" class="card-body">
      <img :src="`/static/imgs/C-A.png`" class="image">
      <p class="title">一种用于皮包自动除尘涂油保养的装置</p>
      <div class="flex-between">
        <span class="price1">￥20000</span>
        <span class="price2"><span class="icon">VIP</span><span class="num">￥15000</span></span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => {
        return {}
      }
    },
    width: {
      type: [Number, String],
      default: 220
    }
  }
}
</script>

<style lang="less" scoped>
.card-body{
  cursor: pointer;
  width: 220px;
  margin-bottom: 20px;
  /deep/.el-card__body{
    padding: 13px;
  }
  .image{
    width: 100%;
  }
  .title{
    margin: 8px 0 26px;
  }
  .price1{
    font-size: 18px;
    font-weight: 700;
  }
  .price2{
    display: flex;
    border: 1px solid gold;
    border-radius: 3px;
    padding: 0 4px 0 4px;
    align-items: center;
    .icon{
      margin-right: 2px;
      color: #fff;
      background: linear-gradient(45deg, gold, transparent);
      padding: 1px 2px;
      border-radius: 3px;
      font-style: italic;
    }
    .num{
      font-size: 16px;
      font-weight: 700;
      color: #ff5858;
    }
  }
}
</style>
