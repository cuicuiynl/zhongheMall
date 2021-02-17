<template>
  <div>
    <div>
      <template v-for="(item, index) in collectList">
        <productCard :product="item" :key="index"></productCard>
      </template>
    </div>
    <emptyPage v-if="!collectList.length" :imgUrl="'/static/imgs/empty-collect.png'" emptyText="暂无收藏"></emptyPage>
    <el-pagination
      v-if="pageInfo.total > 10"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageInfo.pageNum"
      :page-sizes="[10, 50, 100, 200, 500]"
      :page-size="pageInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfo.total">
    </el-pagination>
  </div>
</template>

<script>
import productCard from '../components/productCard.vue'
import emptyPage from '@/components/emptyPage'
const getCollectListUrl = ''
export default {
  components: {
    productCard,
    emptyPage
  },
  data () {
    return {
      collectList: [{
        title: '一种用于皮包自动除尘涂油保养的装置',
        price: 20000,
        vipPrice: 15000
      }], // 收藏列表
      pageInfo: {
        total: 0,
        pageSize: 10,
        pageNum: 1
      }
    }
  },
  methods: {
    getCollectList () {
      console.log('pageInfo', this.pageInfo)
      let params = {
        pageNum: this.pageInfo.pageNum,
        pageSize: this.pageInfo.pageSize
      }
      console.log('getProductList--params', params)
      this.$ajax(getCollectListUrl, params).then(res => {
        if (res.statusCode === 200) {
          let objectData = res.objectData || {}
          this.pageInfo.total = objectData.totalNum
          if (objectData.collectList && objectData.collectList.length) {
            this.collectList = objectData.collectList
          }
        }
      })
    },
    handleSizeChange (val) {
      this.pageInfo.pageNum = 1
      this.pageInfo.pageSize = val
      this.getCollectList()
    },
    handleCurrentChange (val) {
      this.pageInfo.pageNum = val
      this.getCollectList()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
