<template>
  <div class="pt20">
    <div class="flex-between-center mb20">
      <h6>商品管理</h6>
      <el-button size="small" type="info" class="mr20" @click="downLoad">下载模板</el-button>
    </div>
    <div class="mb20">
      <el-upload
      drag
      action="http://175.24.11.167:8088/zhonghe/upload/uploadFile"
      :on-success="handleSuccess"
      :on-error="handleError"
      accept=".xlsx,.xls"
      :headers="myHeaders"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传xls/xlsx文件，且不超过20M</div>
        <!-- <el-tooltip content="只能上传xls/xlsx文件，且不超过20M" placement="right">
          <el-button size="small" type="primary">上传专利</el-button>
        </el-tooltip> -->
      </el-upload>
    </div>
    <div class="text-right">
      <el-button size="small" type="info" class="mr20 mb20" @click="deleteAll">删除全部</el-button>
    </div>
    <div class="data-list pb20">
      <el-table
      :data="tableData"
      border
      height="400"
      style="width: 100%">
        <el-table-column
          fixed
          prop="patentName"
          width="250"
          label="专利名称">
        </el-table-column>
        <el-table-column
          prop="patentNo"
          label="专利号">
        </el-table-column>
        <el-table-column
          prop="tag"
          label="标签">
        </el-table-column>
        <el-table-column
          prop="category"
          label="专利分类">
        </el-table-column>
        <el-table-column
          width="80"
          prop="price"
          label="价格">
        </el-table-column>
        <el-table-column
          width="80"
          prop="vipPrice"
          label="VIP价格">
        </el-table-column>
        <el-table-column
          prop="patentType"
          label="专利类型">
        </el-table-column>
        <el-table-column
          prop="inventor"
          label="发明人">
        </el-table-column>
        <el-table-column
          prop="lawStatus"
          label="法律状态">
        </el-table-column>
        <el-table-column
          prop="saleStatus"
          label="销售状态">
        </el-table-column>
        <el-table-column
          prop="payDeadline"
          label="销售截止日期">
        </el-table-column>
        <!-- <el-table-column
          prop="payDeadline"
          label="上架时间">
        </el-table-column> -->
        <!-- <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <emptyPage v-if="!tableData.length"></emptyPage>
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
</template>

<script>
import emptyPage from '@/components/emptyPage'
import {patentTypeMap, lawStatusMap, inventorMap} from '@/common/constant.js'
const productListUrl = '/zhonghe/product/getProductList'
const deletAllUrl = '/zhonghe/upload/deleteAllProduct'
export default {
  name: 'productManage',
  components: {
    emptyPage
  },
  data () {
    return {
      myHeaders: {},
      pageInfo: {
        total: 0,
        pageSize: 10,
        pageNum: 1
      },
      tableData: [{
        partentName: '专利',
        orderNum: '1222',
        partentNo: '111222',
        endDate: '2016-05-02',
        lawType: '333',
        orderNo: '王小虎',
        saler: '王小虎',
        price: '222222',
        status: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  mounted () {
    this.init()
    // this.getProductList()
  },
  methods: {
    init () {
      let userInfo = sessionStorage.zhongheAdmin ? JSON.parse(sessionStorage.zhongheAdmin) : ''
      let token = userInfo.token || ''
      this.myHeaders.token = token
      this.patentTypeMap = { ...patentTypeMap }
      this.lawStatusMap = { ...lawStatusMap }
      this.inventorMap = { ...inventorMap }
      this.getProductList()
    },
    getProductList () {
      let params = {
        pageNum: this.pageInfo.pageNum,
        pageSize: this.pageInfo.pageSize
      }
      this.$ajax(productListUrl, params).then(res => {
        if (res.statusCode === 200) {
          let objectData = res.objectData || {}
          this.pageInfo.total = objectData.totalNum
          this.tableData = objectData.productEntityList && objectData.productEntityList.length ? objectData.productEntityList : []
        }
      })
    },
    downLoad () {
      let origin = window.location.origin
      console.log('/static/template.xlsx', `${origin}/static/productInfo.xlsx`)
      window.location.href = `${origin}/static/template.xlsx`
    },
    deleteAll () {
      this.$confirm('此操作将删除全部商品信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.confirmDeletAll()
      }).catch(() => {
      })
    },
    confirmDeletAll () {
      console.log('删除')
      this.$ajax(deletAllUrl, {}, 'get').then(res => {
        if (res.statusCode === 200) {
          // let objectData = res.objectData || {}
          // this.$message.success(objectData)
          this.$message.success('删除成功')
          this.getProductList()
        }
      }).catch((err) => {
        console.log('err--删除报错', err)
        this.$message.error('服务器连接失败')
      })
    },
    // 文件上传成功时的钩子
    handleSuccess (res, file, fileList) {
      console.log(res, file, fileList)
      this.getProductList()
      this.$message.success('文件上传成功')
    },
    // 文件上传失败时的钩子
    handleError (err, file, fileList) {
      console.log(err, file, fileList)
      this.$message.error('文件上传失败')
    },
    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    // beforeUploadFile(file) {
    //   console.log('before upload');
    //   console.log(file);
    //   let extension = file.name.substring(file.name.lastIndexOf('.')+1);
    //   let size = file.size / 1024 / 1024;
    //   if(extension !== 'xlsx') {
    //     this.$message.warning('只能上传后缀是.xlsx的文件');
    //   }
    //   if(size > 10) {
    //     this.$message.warning('文件大小不得超过10M');
    //   }
    // },
    // uploadFile() {
    //   if (this.fileList.length === 0){
    //     this.$message.warning('请上传文件');
    //   } else {
    //     let form = new FormData();
    //     form.append('file', this.fileList);
    //     this.$axios({
    //       method:"post",
    //       url: "/statistical/uploadbug",
    //       headers:{
    //         'Content-type': 'multipart/form-data'
    //       },
    //       data:form
    //     }).then(
    //       res=>{

    //       },err =>{
    //       });
    //   }
    // },
    handleSizeChange (val) {
      this.pageInfo.pageNum = 1
      this.pageInfo.pageSize = val
      this.getProductList()
    },
    handleCurrentChange (val) {
      this.pageInfo.pageNum = val
      this.getProductList()
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.el-upload{
  width: 100%;
  text-align: center;
}
/deep/.el-upload__tip{
  text-align: center;
}
/deep/.el-upload-dragger{
  width: 100%;
}
/deep/.el-upload-list{
  display: none;
}
</style>
