<template>
  <div>
    <el-table
      class="mt10 mb20"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="partentName"
        label="专利名称">
      </el-table-column>
      <el-table-column
        prop="partentNo"
        label="专利号">
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <!-- 已付款或已失效 -->
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small">
            删除
          </el-button>
          <!-- 待付款 -->
           <purchaseBtn btnType="text"></purchaseBtn>
        </template>
      </el-table-column>
    </el-table>
    <emptyPage v-if="!tableData.length" imgUrl="/static/imgs/empty-order.png" :emptyText="'购物车空空如也'"></emptyPage>
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
import emptyPage from '@/components/emptyPage'
import purchaseBtn from '../components/purchaseBtn'
const listUrl = ''
const deleteUrl = ''

export default {
  components: {
    purchaseBtn,
    emptyPage
  },
  data () {
    return {
      pageInfo: {
        total: 0,
        pageSize: 10,
        pageNum: 1
      },
      tableData: [{
        partentName: 'zhuanlimingc',
        orderNum: '1222',
        partentNo: '111',
        date: '2016-05-02',
        type: '333',
        orderNo: '王小虎',
        saler: '王小虎',
        price: '222222',
        status: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    deleteRow () {
      this.$ajax(deleteUrl).then(res => {
        if (res.statusCode === 200) {
          this.getList()
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    getList () {
      console.log('pageInfo', this.pageInfo)
      let params = {
        pageNum: this.pageInfo.pageNum,
        pageSize: this.pageInfo.pageSize
      }
      console.log('getProductList--params', params)
      this.$ajax(listUrl, params).then(res => {
        if (res.statusCode === 200) {
          let objectData = res.objectData || {}
          this.pageInfo.total = objectData.totalNum
          if (objectData.orderList && objectData.orderList.length) {
            this.tableData = objectData.orderList
          }
        }
      })
    },
    handleSizeChange (val) {
      this.pageInfo.pageNum = 1
      this.pageInfo.pageSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.pageInfo.pageNum = val
      this.getList()
    }
  }
}
</script>

<style>

</style>
