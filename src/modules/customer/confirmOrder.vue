<template>
  <pageModal>
    <div slot="pageContent" class="confirm-order-wrap">
      <div class="order-left">
        <pannel :title="'商品信息'" class="mb10">
          <div slot="content" class="flex-only">
            <div class="left-side">
              <img :src="`/static/imgs/C-A.png`" class="partent-image">
            </div>
            <div class="right-side">
              <p class="right-title">一种可自动除臭的运动背包</p>
              <ul class="info-zone">
                <li><span class="label">专利号</span> 111</li>
                <li><span class="label">专利类型</span> 111</li>
                <li><span class="label">法律状态</span> 111</li>
                <li><span class="label">缴费截止</span> 111</li>
                <li><span class="label">发明人</span> 111</li>
                <li><span class="label">数量</span> 1</li>
              </ul>
            </div>
          </div>
        </pannel>
        <pannel :title="'订单备注'" class="mb20">
          <div slot="content">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入订单备注(选填)"
              v-model="orderMark">
            </el-input>
          </div>
        </pannel>
      </div>
      <div class="order-right">
        <div class="flow">
          <span class="mr20"><span class="order-num">1</span>确认信息</span>
          <span class="mr20"><span class="order-num">2</span>付款到平台</span>
          <span class="mr20"><span class="order-num">3</span>订单完成</span>
        </div>
        <pannel :title="'订单金额'">
          <div slot="content">
            <p class="flex-between-center mb10">
              <span>原价</span>
              <span>￥20000</span>
            </p>
            <p class="flex-between-center mb10">
              <span>VIP会员</span>
              <span>-￥5000</span>
            </p>
            <p class="flex-between-center price-wrap">
              <span>实付</span>
              <span class="price">￥15000</span>
            </p>
            <div class="flex-v-center pay-type">
              <img src="/static/imgs/wechat-icon.png">
              <span>
                <span>微信，是一种生活方式</span>
              </span>
            </div>
            <p class="confirm-btn">确认付款</p>
          </div>
        </pannel>
      </div>
    </div>
  </pageModal>
</template>

<script>
import pageModal from './components/pageModal'
import pannel from '@/components/pannel'
export default {
  name: 'confirmOrder',
  components: {
    pageModal,
    pannel
  },
  data () {
    return {
      orderMark: ''
    }
  }
}
</script>

<style lang="less" scoped>
.confirm-order-wrap{
  display: flex;
  align-items: stretch;
}
.order-left{
  margin-right: 20px;
}
.order-right{
  width: 30%;
  flex-shrink: 0;
  font-size: 14px;
  .flow{
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    font-size: 16px;
    color: #999;
    padding: 15px 20px;
    margin-bottom: 20px;
    .order-num{
      display: inline-block;
      text-align: center;
      font-size: 14px;
      width: 18px;
      height: 18px;
      line-height: 17px;
      border-radius: 50%;
      border: 1px solid #999;
      margin-right: 3px;
    }
  }
  .price-wrap{
    border-bottom: 1px dashed #ddd;
    padding-bottom: 10px;
    margin-top: 30px;
    margin-bottom: 20px;
    .price{
      color: #ff5858;
      font-size: 30px;
      line-height: 1;
    }
  }
}
.left-side{
    flex-shrink: 0;
    width: 200px;
    padding-right: 20px;
    .partent-image{
      width: 100%;
      padding: 5px;
      border: 1px solid #ddd;
    }
  }
.right-side{
  flex-grow: 1;
  .right-title{
    font-size: 20px;
    margin-bottom: 30px;
  }
  .label{
    color: #999;
  }
}
.info-zone{
  display: flex;
  flex-wrap: wrap;
  >li{
    width: 49%;
    font-size: 14px;
    margin-bottom: 12px;
    .label{
      color: #666;
      display: inline-block;
      width: 120px;
    }
  }
}
.pay-type{
  min-height: 132px;
}
.confirm-btn{
  margin-top: 20px;
  padding: 15px 20px;
  text-align: center;
  color: #fff;
  background: #ff5858;
  cursor: pointer;
}
</style>
