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
      label="专利名称"
      width="150">
    </el-table-column>
    <el-table-column
      prop="orderNum"
      label="订单号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="partentNo"
      label="专利号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="price"
      label="价格">
    </el-table-column>
    <el-table-column
      prop="date"
      label="订单时间"
      width="120">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态">
    </el-table-column>
    <el-table-column
      prop="saler"
      label="卖家"
      width="80">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="80">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
    }
  }
}
</script>

<style>

</style>
