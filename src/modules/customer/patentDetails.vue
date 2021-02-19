<template>
  <pageModal>
    <div slot="pageContent" class="pt10">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/goodsList' }">专利市场</el-breadcrumb-item>
        <el-breadcrumb-item>专利详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="detail-content">
        <div class="flex-only detail-content-main">
          <div class="left-side">
          <img :src="`/static/imgs/some.jpg`" class="partent-image">
          </div>
          <div class="right-side">
            <p class="right-title">{{patentInfo.patentName}}</p>
            <div class="price-zone">
              <p class="mb10">
                <span class="label">零售价</span>
                <span class="price">￥{{patentInfo.price}}</span>
              </p>
              <p>
                <span class="label">VIP价格</span>
                <span class="vip-price">￥{{patentInfo.vipPrice}}</span>
              </p>
            </div>
            <ul class="info-zone">
              <li><span class="label">专利号</span> {{patentInfo.patentNo}}</li>
              <li><span class="label">专利类型</span> {{patentTypeMap[patentInfo.patentType] || '-'}}</li>
              <li><span class="label">法律状态</span> {{lawStatusMap[patentInfo.lawStatus] || '-'}}</li>
              <li><span class="label">缴费截止</span> {{patentInfo.payDeadline || '-'}}</li>
              <li><span class="label">发明人</span> {{inventorMap[patentInfo.inventor] || '-'}}</li>
              <li><span class="label">销售状态</span> {{patentInfo.saleStatus || '-'}}</li>
            </ul>
            <div class="btn-wrap mt20">
              <purchaseBtn class="mr10"></purchaseBtn>
              <cartBtn></cartBtn>
            </div>
            <p class="label mt20">此商品已全权委托平台寄卖，平台免费提供担保交易服务。</p>
          </div>
        </div>
        <img src="/static/imgs/adv2.png" class="adv-image">
      </div>
      <div class="transfer-ques">
        <div class="a-wrap">
          <span class="a-item">交易资料</span>
          <span class="a-item">过户资料</span>
          <span class="a-item">常见问题</span>
        </div>
        <div class="main-info">
          <!-- <a name="d1"></a> -->
          <img src="/static/imgs/detail-flow.png" class="ques-image">
          <!-- <a name="d2"></a> -->
          <img src="/static/imgs/transfer-info.png" class="ques-image">
          <!-- <a name="d3"></a> -->
          <img src="/static/imgs/questions.png" class="ques-image">
        </div>
        <div class="center">
          <!-- // 暂时隐藏 -->
          <!-- <span class="zh-theme-btn a-btn">查看更多常见问题</span> -->
        </div>
      </div>
    </div>
  </pageModal>
</template>

<script>
import pageModal from './components/pageModal'
import purchaseBtn from './components/purchaseBtn'
import cartBtn from './components/cartBtn'
import {patentTypeMap, lawStatusMap, inventorMap} from '@/common/constant.js'
const getDetailUrl = '/nine/product/productDetail'
export default {
  name: 'patentDetails',
  components: {
    pageModal,
    purchaseBtn,
    cartBtn
  },
  data () {
    return {
      patentNo: '',
      patentTypeMap: {},
      lawStatusMap: {},
      inventorMap: {},
      patentInfo: {}
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.patentTypeMap = { ...patentTypeMap }
      this.lawStatusMap = { ...lawStatusMap }
      this.inventorMap = { ...inventorMap }
      this.patentNo = this.$route.query.patentNo
      document.documentElement.scrollTop = 0
      this.getList()
    },
    getList () {
      let params = {
        patentNo: this.patentNo
      }
      this.$ajax(getDetailUrl, params).then(res => {
        if (res.statusCode === 200) {
          this.patentInfo = res.objectData || {}
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.detail-content{
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  margin: 15px 0;
  background: #fff;
}
.detail-content-main{
  padding: 30px 20px;
  border-bottom: 1px solid #ddd;
}
.adv-image{
  width: 100%;
}
.left-side{
    flex-shrink: 0;
    width: 26%;
    padding-right: 20px;
    .partent-image{
      width: 100%;
      padding: 5px;
      border: 1px solid #ddd;
    }
  }
.right-side{
  flex-grow: 1;
  .price-zone{
    background-color: #f3faff;
    padding: 12px 10px;
    margin-bottom: 20px;
  }
  .right-title{
    font-size: 20px;
    margin-bottom: 30px;
    font-weight: bold;
  }
  .label{
    color: #999;
  }
  .price{
    font-weight: bold;
    font-size: 18px;
  }
  .vip-price{
    color: #ff5858;
    font-size: 30px;
  }
}
.transfer-ques{
  margin-bottom: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.main-info{
  padding: 20px;
}
.info-zone{
  >li{
    font-size: 14px;
    margin-bottom: 12px;
    .label{
      color: #666;
      display: inline-block;
      width: 120px;
    }
  }
}
.ques-image{
  padding-top: 60px;
  width: 100%;
}
.a-wrap{
  padding: 20px 30px;
  font-size: 15px;
  display: flex;
  border-bottom: 1px solid #ddd;
  .a-item {
    margin-right: 50px;
  }
}
.a-btn{
  display: inline-block;
  margin-bottom: 20px;
  padding: 12px 22px;
  font-size: 16px;
}
a:link {
color:#3C3C3C;
}
a:visited {
color:#3C3C3C;
}
</style>
