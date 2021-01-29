<template>
  <div class="goods-page">
      <headerNavMall></headerNavMall>
      <div class="banner">
        <p class="banner-text">全网最真实的一手交易平台</p>
        <div class="search-wrap">
          <el-input
            style="width: 400px"
            placeholder="请搜索专利号/名称"
            suffix-icon="el-icon-date"
            size="large"
            clearable
            v-model="searchCondition">
          </el-input>
          <el-button round class="ml10" @click="handleSearch(searchCondition)">搜索</el-button>
          <p class="mt10">
            <span @click="handleSearch(item)" class="keyword-item" v-for="item in keyWords" :key="item">{{item}}</span>
          </p>
        </div>
      </div>
      <!-- 产品列表 -->
      <div>
        <el-tabs :tab-position="tabPosition" style="height: 600px;">
          <el-tab-pane :label="item.name" v-for="item in goodlist" :key="item.category">

          </el-tab-pane>
        </el-tabs>
      </div>

  </div>
</template>

<script>
import headerNavMall from '@/components/headerNavMall'
export default {
  name: 'goods',
  components: {
    headerNavMall
  },
  data () {
    return {
      // 搜索条件
      searchCondition: '',
      tabPosition: 'left',
      keyWords: ['急救', '手机零部件制造', '自动', '包装', '加工'],
      goodlist: [
        {name: '人类生活必须', category: 'A', list: []},
        {name: '作业和运输', category: 'B', list: []},
        {name: '纺织和造纸', category: 'C', list: []},
        {name: '化学和冶金', category: 'D', list: []},
        {name: '固定构造', category: 'E', list: []},
        {name: '机械工程', category: 'F', list: []},
        {name: '物理', category: 'G', list: []},
        {name: '电学', category: 'H', list: []}
      ]
    }
  },
  methods: {
    handleSearch (val = '') {
      if (val) {
        let word = val || this.searchCondition
        this.$router.push({name: 'goodsList', query: { word }})
      }
    }
  }
}
</script>

<style lang="less" scoped>
.goods-page{
  width: 1190px;
  margin: 0 auto;
}
.banner {
  width: 1190px;
  margin-top:20px;
  margin-bottom: 20px;
  // margin: 20px auto 0;
  border-radius: 10px;
  overflow: hidden;
  background: linear-gradient(45deg, #0885de, transparent);
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
    width: 500px;
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
</style>
