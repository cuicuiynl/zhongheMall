<template>
  <div class="patent-card">
    <img :src="`/static/imgs/some.jpg`" class="image" @click="checkDetail">
    <div class="partent-info-wrap">
      <p class="partent-name zh-a-theme" @click="checkDetail">{{patent.patentName}}</p>
      <span class="partent-info">专利号：{{patent.patentNo}}</span>
      <span class="partent-info">领域：{{patent.tag}}</span>
      <span class="partent-info">发明人：{{inventorMap[patent.inventor] || '-'}}</span>
      <span class="partent-info">专利类型：{{patentTypeMap[patent.patentType] || '-'}}</span>
      <span class="partent-info">法律状态：{{inventorMap[patent.lawStatus] || '-'}}</span>
      <div class="flex-between-center">
        <div>
          <!-- <span class="status-tip">未下证</span>
          <span class="status-tip">预售</span> -->
        </div>
        <div class="flex-v-center">
          零售价：<span class="price">￥{{patent.price}}</span>
          <img src="/static/imgs/vipLog.png" class="ml5"> <span class="red ml5">￥<span class="vip-price">{{patent.vipPrice}}</span></span>
          <el-button type="danger" size="small" class="ml20" @click="tip">立即购买</el-button>
          <el-button size="small" class="ml10" @click="tip">加入购物车</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'patentListCard',
  props: {
    patent: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      patentTypeMap: {
        0: '不限',
        1: '发明专利',
        2: '新型实用专利',
        3: '外观设计专利'
      },
      lawStatusMap: {
        0: '不限',
        1: '已下证',
        2: '未下证'
      },
      inventorMap: {
        0: '不限',
        1: '提供',
        2: '不提供',
        3: '不公告'
      }
    }
  },
  methods: {
    tip () {
      this.$alert('请联系高先生：13342903057 进行后续购买流程', '提示', {
        confirmButtonText: '确定',
        callback: action => {}
      })
    },
    checkDetail () {
      this.$store.commit('updateActivedTab', this.$route.name)
      this.$router.push({
        name: 'patentDetails',
        query: {
          patentNo: this.patent.patentNo || ''
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.patent-card{
  display: flex;
  align-items: center;
  padding: 10px 30px;
  border-bottom: 1px solid #e8e8e8;
  .image{
    flex-shrink: 0;
    width: 118px;
    height: 118px;
  }
  .partent-info-wrap{
    flex-grow: 1;
    padding-left: 20px;
    font-size: 14px;
  }
  .partent-name{
    font-size: 16px;
    margin-bottom: 5px;
    font-weight: bold;
  }
  .partent-info{
    color: #666;
    display: inline-block;
    overflow: hidden;
    padding: 5px 15px 5px 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 33%;
  }
  .status-tip{
    color: #2f86dd;
    border: 1px solid #2f86dd;
    border-radius: 4px;
    display: inline-block;
    padding: 2px 4px;
    font-size: 12px;
    margin-right: .6em;
  }
  .price{
    font-weight: bold;
  }
  .red{
    color:red;
  }
  .vip-price{
    font-size:24px;
  }
}
</style>
