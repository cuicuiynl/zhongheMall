<template>
  <div class="filter-pannel">
    <div class="clearFix">
      <div class="fr zh-a-theme open-close-btn" @click="pannelOpen = !pannelOpen">
        <span v-if="pannelOpen">收起筛选</span>
        <span v-else>显示筛选</span>
      </div>
      <div v-if="selectedList.length">
        <span class="filter-title ml20">已选条件:</span>
        <span v-for="(item) in selectedList"
        :key="item.key"
        class="filter-tag"
        >{{item.label}}<span class="ml5">x</span></span>
      </div>
    </div>
    <el-card class="card" :class="{'hide': !pannelOpen}">
      <div class="flex-only item-wrap" v-for="item in pannelList" :key="item.key">
        <span class="filter-title">{{item.title}}：</span>
        <p>
          <span v-for="item2 in item.list"
          :key="item2.label"
          @click="selectItem(item2, item.key)"
          :class="{'actived': item2.value===selectedMap[item.key].value}"
          class="filter-item zh-a-theme">{{item2.label}}</span>
        </p>
      </div>
    </el-card>
  </div>
</template>

<script>
import techData from '../../../../static/mock/technicalField.json'
// const technicalField = '/technicalField.do'

export default {
  name: 'searchPannel',
  data () {
    return {
      pannelOpen: true,
      selectedList: [],
      selectedMap: {
        patentType: {value: 0},
        tag: {value: 0},
        lawStatus: {value: 0},
        inventor: {value: 0}
      },
      pannelList: [
        {
          key: 'patentType',
          title: '专利类型',
          list: [
            {value: 0, label: '不限'},
            {value: 1, label: '发明专利'},
            {value: 2, label: '新型实用专利'},
            {value: 3, label: '外观设计专利'}
          ]
        },
        {
          key: 'tag',
          title: '技术领域',
          list: []
        },
        {
          key: 'lawStatus',
          title: '法律状态',
          list: [
            {value: 0, label: '不限'},
            {value: 1, label: '已下证'},
            {value: 2, label: '未下证'}
          ]
        },
        {
          key: 'inventor',
          title: '发明人',
          list: [
            {value: 0, label: '不限'},
            {value: 1, label: '提供'},
            {value: 2, label: '不提供'},
            {value: 3, label: '不公告'}
          ]
        }
      ]
    }
  },
  mounted () {
    // this.getTechnicalField()
    this.init()
  },
  methods: {
    init () {
      let newData = techData.data.map((item) => {
        return {
          value: item.tag,
          label: item.tag
        }
      })
      this.$set(this.pannelList[1], 'list', [{label: '不限', value: 0}, ...newData])
    },
    selectItem (val, key) {
      console.log('selectItem-val, key', val, key)
      this.$set(this.selectedMap, key, val)
      let selectList = []
      let searchMap = {}
      for (let key in this.selectedMap) {
        let val = this.selectedMap[key].value
        if (val !== 0) {
          selectList.push({
            key,
            label: this.selectedMap[key].label
          })
        }
        searchMap[key] = this.selectedMap[key].value
      }
      this.selectedList = selectList
      this.$emit('searchPannel', searchMap)
    },
    delSelected (index, type) {
      this.selectedList.splice(index, 1)
    }
    // 暂时不用
    // getTechnicalField () {
    //   this.$ajax(technicalField).then(res => {
    //     console.log('getTechnicalField-res', res)
    //     if (res.statusCode === 200 && res.objectData) {
    //       let data = res.objectData || []
    //       let newData = data.map((item) => {
    //         return {
    //           value: item.tag,
    //           label: item.tag
    //         }
    //       })
    //       this.$set(this.pannelList[1], 'list', [{label: '不限', value: 0}, ...newData])
    //     }
    //   })
    // }
  }
}
</script>

<style lang="less" scoped>
.filter-pannel{
  font-size: 14px;
  .open-close-btn{
    padding: 5px 8px;
    background: #fff;
    display: inline-block;
    transition: 0.3s;
  }
  .card{
    transition: .3s;
    min-height: 132px;
    &.hide{
      opacity: 0;
      height: 0;
      min-height: 0;
      padding: 0 15px;
    }
  }
  .item-wrap{
    line-height: 33px;
  }
  .filter-title{
    display: inline-block;
    color: #999;
    margin-right: 20px;
    width: 80px;
    flex-shrink: 0;
  }
  .filter-item{
    display: inline-block;
    margin-right: 20px;
  }
  .filter-tag{
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 2px;
    color: #14a8bd;
    background-color: #daf6fa;
    padding: 3px 8px;
    border: none;
  }
  .btn{
    background: #fff;
    display: inline-block;
    padding: 5px 10px;
    border-radius: 5px;
  }
}
</style>
