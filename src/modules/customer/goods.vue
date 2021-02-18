<template>
  <pageModal>
    <div slot="pageContent">
      <div class="banner">
        <p class="banner-text">全网最真实的一手交易平台</p>
        <div class="search-wrap">
          <el-input
            style="width: 100%"
            placeholder="请搜索专利号/名称"
            size="large"
            clearable
            v-model="searchCondition">
             <i slot="suffix" class="el-input__icon el-icon-search" @click="handleSearch(searchCondition)"></i>
          </el-input>
          <!-- <el-button round class="ml10" @click="handleSearch(searchCondition)">搜索</el-button> -->
          <p class="mt10">
            <span @click="handleSearch(item)" class="keyword-item" v-for="item in keyWords" :key="item">{{item}}</span>
          </p>
        </div>
      </div>
      <!-- 产品列表 -->
      <div class="products-warp">
        <el-tabs :tab-position="tabPosition">
          <el-tab-pane :label="key" v-for="(value, key) in goodlist" :key="key">
            <div class="flex-wrap tab-content">
              <div v-for="(item, index) in value"  :key="index" class="card-wrap">
                <el-card shadow="hover" v-if="index < 10" class="card-body" >
                  <img :src="`/static/imgs/some.jpg`" class="image" @click="goDetailPage(item)">
                  <p class="title" @click="goDetailPage(item)" :title="item.patentName">{{item.patentName}}</p>
                  <div class="flex-between" @click="goDetailPage(item)">
                    <span class="price1">￥{{item.price}}</span>
                    <span class="price2"><span class="icon">VIP</span><span class="num">￥{{item.vipPrice}}</span></span>
                  </div>
                </el-card>
              </div>
            </div>
            <div class="center" v-show="value.length>10"><el-button type="text" class="btn-style" @click="getMore(key)">查看更多>>>></el-button></div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!-- 交易流程 -->
      <div class="flow-wrap">
        <span class="flow-title">专利交易流程</span>
        <p class="flow-subtitle">优质专利 流程便捷</p>
        <div class="flex-between-center flow-step-wrap" >
          <div v-for="(item, index) in flow" :key="item.title">
            <p><span class="flow-step">{{index+1}}</span></p>
            <p class="flow-step-title">{{item.title}}</p>
            <p v-html="item.discribe" class="flow-discribe"></p>
          </div>
        </div>
        <!-- <img src="/static/imgs/flow.png" class="flow-img"> -->
      </div>
      <img src="/static/imgs/adv.png" class="w100p">
    </div>
  </pageModal>
</template>

<script>
import pageModal from './components/pageModal'
const getListUrl = '/nine/product/categoriedProducts'
export default {
  name: 'goods',
  components: {
    pageModal
  },
  data () {
    return {
      // 搜索条件
      searchCondition: '',
      tabPosition: 'top',
      keyWords: ['急救', '手机零部件制造', '自动', '包装', '加工'],
      goodlist: {},
      // goodlist: [
      //   {name: '人类生活必须', category: 'A', list: []},
      //   {name: '作业和运输', category: 'B', list: []},
      //   {name: '纺织和造纸', category: 'C', list: []},
      //   {name: '化学和冶金', category: 'D', list: []},
      //   {name: '固定构造', category: 'E', list: []},
      //   {name: '机械工程', category: 'F', list: []},
      //   {name: '物理', category: 'G', list: []},
      //   {name: '电学', category: 'H', list: []}
      // ],
      // 专利流程
      flow: [
        {title: '挑选专利', discribe: `一对一专属顾问</br>挑选适合自己的专利`},
        {title: '确认下单', discribe: `选择满意的专利</br>并确认下单`},
        {title: '支付货款', discribe: `支持微信付款</br>付款到平台`},
        {title: '过户交接', discribe: `专属顾问协助</br>完成过户交接`},
        {title: '订单完成', discribe: `平台付款给卖家</br>订单完成`}
      ]
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    // 搜索
    handleSearch (val = '') {
      if (val) {
        let word = val || this.searchCondition
        this.$router.push({name: 'goodsList', query: { word }})
      }
    },
    // 查看更多
    getMore (key) {
      this.$store.commit('updateActivedTab', 'goodsList')
      this.$router.push({
        name: 'goodsList',
        query: {
          category: key
        }
      })
    },
    // 详情页
    goDetailPage (item = {}) {
      this.$store.commit('updateActivedTab', 'patentDetails')
      this.$router.push({
        name: 'patentDetails',
        query: {
          patentNo: item.patentNo || ''
        }
      })
    },
    getList () {
      let params = {
        number: 10
      }
      this.$ajax(getListUrl, params).then(res => {
        if (res.statusCode === 200) {
          let objectData = res.objectData || {}
          this.goodlist = objectData
          console.log('res==', res)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.banner {
  max-width: 1190px;
  margin-top:20px;
  margin-bottom: 20px;
  border-radius: 10px;
  overflow: hidden;
  // background: #B12020;
  background: linear-gradient(90deg, #B12020 60%, #353538);
  // background: url('/static/imgs/banner.jpg') no-repeat;
  background-size: 100%;
  height: 340px;
  text-align: center;
  .banner-text{
    color: #fff;
    font-size: 40px;
    letter-spacing: 10px;
    margin-top: 60px;
    margin-bottom: 50px;
  }
  .search-wrap{
    width: 55%;
    text-align: left;
    margin: 0 auto;
  }
  .keyword-item{
    color: #fff;
    margin-right: 15px;
    font-size: 14px;
    cursor: pointer;
  }
}
.products-warp{
  height: 630px;
}
.card-body{
  cursor: pointer;
  // width: 220px;
  // margin-bottom: 20px;
  /deep/.el-card__body{
    padding: 13px;
  }
  .image{
    width: 100%;
  }
  .title{
    margin: 8px 0 26px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
.btn-style{
  color: #999;
}
.flow-wrap{
  text-align: center;
  padding: 40px 0 100px 0;
  margin-top: 20px;
  margin-bottom: 30px;
  // background: url('/static/imgs/background.jpg') no-repeat;
  // background-size: 100%;
  background: linear-gradient(0deg, #B12020, #353538);
  // background: linear-gradient(90deg, rgba(102, 177, 255, .92), #1e5c9c,rgba(102, 177, 255, .92));
  border-radius: 10px;
  .flow-step-wrap{
    width: 80%;
    margin: 0 auto;
  }
  .flow-title{
    font-size: 30px;
    position: relative;
    padding: 24px;
    color: #fff;
    &::before{
      content: "";
      position: absolute;
      top: 50%;
      left: -3em;
      transform: translateY(-50%);
      background-color: silver;
      height: 1px;
      width: 3em;
    }
    &::after{
      content: "";
      position: absolute;
      top: 50%;
      right: -3em;
      transform: translateY(-50%);
      background-color: silver;
      height: 1px;
      width: 3em;
    }
  }
  .flow-subtitle{
    color: #e9e9e9;
    margin-bottom: 40px;
    margin-top:20px;
    text-align: center;
  }
  .flow-step{
    color:#000;
    font-size:18px;
    display: inline-block;
    width: 26px;
    height: 26px;
    line-height: 26px;
    background: #d88989;
    border:1px solid #B12020;
    border-radius: 50px;
  }
  .flow-step-title{
    color:white;
    font-size:22px;
    padding: 20px 40px;
  }
  .flow-discribe{
    color:#ddd;
  }
}
.tab-content{
  display: flex;
  .card-wrap{
    width: 20%;
    margin-bottom: 20px;
    padding-right: 10px;
    padding-left: 10px;
  }
}
@media screen and (max-width:780px){
  .tab-content{
    .card-wrap {
      width: 50%;
    }
  }
}
/deep/.el-tabs__item{
  min-width: 100px;
  text-align: center;
}
/deep/.el-tabs__item{
  font-size: 16px;
}
</style>
