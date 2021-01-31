<template>
  <pageModal>
      <div slot="pageContent">
        <searchPannel></searchPannel>
      <div class="good-items">
        <patentListCard></patentListCard>
        <!-- 空 -->
        <emptyPage></emptyPage>
      </div>
      </div>
  </pageModal>
</template>

<script>
import searchPannel from './components/searchPannel'
import patentListCard from './components/patentListCard'
import emptyPage from '@/components/emptyPage'
import pageModal from './components/pageModal'

// const getProductListUrl = 'nine/product/getProductList'
const getProductListUrl = 'http://175.24.11.167:8082/nine/product/getProductList'
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
    }
  },
  mounted () {
    this.getProductList()
  },
  methods: {
    getProductList () {
      let params = {
        pageNum: 20,
        pageSize: 1
      }
      this.$ajax(getProductListUrl, params).then(res => {
        console.log('getTechnicalField-res', res)
      })
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
