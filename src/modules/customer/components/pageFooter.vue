<template>
  <div class="footer-wrap">
    <div class="flex-between content">
      <div v-for="(value, key) in list" :key="key">
        <p class="footerItem-title">{{key}}</p>
        <div v-for="(item,index) in value"
        :key="item"
        class="footerItem-content"
        :class="{'zh-a-theme': index > 0}">{{item}}</div>
      </div>
      <div>
        <p class="footerItem-title">微信公众号</p>
        <img src="/static/imgs/wechat.png" width="150">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pageFooter',
  data () {
    return {
      list: {
        '服务内容': ['专利交易', '商标交易', '企业服务', '专利增值服务', '商标增值服务'],
        '交易保障': ['支付方式', '转让资料及流程', '服务协议', '积分规则'],
        '常见问题': ['专利申请', '发明专利', '实用新型专利', '外观设计专利']
      }
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.footer-wrap{
    background-color: #2e3547;
    color: #999;
    font-size: 12px;
    padding: 60px 0;
    .content{
      padding: 0 5%;
      margin:0 auto;
      max-width: 1190px;
    }
}
.footerItem-title{
    color: #fff;
    margin-bottom: 8px;
    font-size: 14px;
}
.footerItem-content{
  margin-bottom: 6px;
}
</style>
