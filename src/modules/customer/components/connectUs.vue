<template>
  <div class="contact-us">
    <el-popover
    placement="left"
    title="免费咨询"
    popper-class="tel-poper"
    width="250"
    trigger="hover">
      <img slot="reference" :src="`/static/imgs/phone.jpg`" class="image">
      <div class="tel-div">
        <span class="label mr10">高先生</span>
        <i class="el-icon-phone-outline mr20"></i>
        13342903057
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.contact-us{
  position: fixed;
  top:50%;
  right:0;
  .tel-div{
    padding: 20px 0;
  }
  .image{
    border-radius: 5px;
    width: 50px;
  }
}
</style>
<style>
.tel-poper{
  text-align: center;
}
</style>
