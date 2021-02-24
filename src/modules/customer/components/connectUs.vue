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
    <el-popover
    placement="left"
    popper-class="tel-poper"
    width="200"
    trigger="hover">
      <img slot="reference" src="/static/imgs/chat.jpg" style="width:38px" class="image">
      <div class="tel-div">
        <img src="/static/imgs/wechat.jpg" class="img-in">
        请扫二维码关注我们
      </div>
    </el-popover>
    <el-popover
    placement="left"
    popper-class="tel-poper"
    width="200"
    trigger="hover">
      <img slot="reference" src="/static/imgs/applet-icon.jpg" class="image">
      <div class="tel-div">
        <img src="/static/imgs/applet.png" class="img-in">
        欢迎关注微信小程序
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
  background: #fff;
  padding-top: 15px;
  padding-left: 5px;
  border-radius: 4px;
  padding-right: 5px;
  .tel-div{
    padding: 20px 0;
  }
  .image{
    border-radius: 5px;
    width: 40px;
    display: block;
    margin-bottom: 10px;
  }
}
</style>
<style lang="less">
.tel-poper{
  text-align: center;
  .img-in{
    width: 100%
  }
}
</style>
