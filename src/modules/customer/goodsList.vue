<template>
  <pageModal>
      <div slot="pageContent">
        <searchPannel @searchPannel="searchPannel"></searchPannel>
      <div class="good-items">
        <div class="list-top">
          <el-input
            style="width:300px;"
            placeholder="请输入专利号/名称"
            v-model="keyword">
            <i slot="suffix" @click="serachKeyword" class="el-input__icon el-icon-search pointer"></i>
          </el-input>
        </div>
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
      keyword: '', // 搜索关键字
      pageInfo: {
        total: 0,
        pageSize: 10,
        pageNum: 1
      },
      searchCondition: {
        keyword: null
      },
      productList: [] // 商品列表
    }
  },
  mounted () {
    this.getProductList()
  },
  methods: {
    searchPannel (obj) {
      Object.assign(this.searchCondition, obj)
      this.getProductList()
    },
    serachKeyword () {
      console.log('keyword', this.keyword)
      this.searchCondition.keyword = this.keyword
      this.getProductList()
    },
    getProductList () {
      let params = {
        pageNum: this.pageInfo.pageNum,
        pageSize: this.pageInfo.pageSize,
        ...this.searchCondition
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
  .list-top{
    padding: 12px 20px;
    border-bottom: 1px solid #ddd;
    text-align: right;
  }
}
</style>
