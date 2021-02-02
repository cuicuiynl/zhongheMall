<template>
  <pageModal>
      <div slot="pageContent">
        <searchPannel></searchPannel>
      <div class="good-items">
        <template v-for="item in productList" >
          <patentListCard :patent="item" :key="item.pid"></patentListCard>
        </template>
        <!-- 空 -->
        <emptyPage v-if="!productList.length"></emptyPage>
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
      </div>
  </pageModal>
</template>

<script>
import searchPannel from './components/searchPannel'
import patentListCard from './components/patentListCard'
import emptyPage from '@/components/emptyPage'
import pageModal from './components/pageModal'

const getProductListUrl = '/nine/product/getProductList'
export default {
  name: 'goodsList',
  components: {
    pageModal,
    searchPannel,
    patentListCard,
    emptyPage
  },
  data () {
    return {
      pageInfo: {
        total: 0,
        pageSize: 10,
        pageNum: 1
      },
      productList: [] // 商品列表
    }
  },
  mounted () {
    this.getProductList()
  },
  methods: {
    getProductList () {
      let params = {
        pageNum: this.pageInfo.pageNum,
        pageSize: this.pageInfo.pageSize
      }
      this.$ajax(getProductListUrl, params).then(res => {
        if (res.statusCode === 200) {
          let objectData = res.objectData || {}
          this.pageInfo = objectData.totalNum
          if (objectData.productEntityList && objectData.productEntityList.length) {
            this.productList = objectData.productEntityList
          }
        }
        console.log('getTechnicalField-res', res)
      })
    },
    handleSizeChange (val) {
      this.pageInfo.pageNum = 1
      this.pageInfo.pageSize = val
    },
    handleCurrentChange (val) {
      this.pageInfo.pageNum = val
    }
  }
}
</script>

<style lang="less" scoped>
.good-items{
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
</style>
