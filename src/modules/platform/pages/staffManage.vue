<template>
  <div>
    <h6 class="mb20">员工管理</h6>
    <div class="text-right">
      <el-button size="small" type="primary" class="mb20" @click="addStaff">添加人员</el-button>
    </div>
    <el-table
      :data="tableData"
      border>
      <el-table-column
        fixed
        prop="nickname"
        label="员工姓名">
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.isEdit || scope.row.isAdd"
            placeholder="请输入姓名"
            v-model="scope.row.editNam"
            size="small"
            clearable>
          </el-input>
          <p v-else>{{ scope.row.nickname }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号">
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.isEdit || scope.row.isAdd"
            placeholder="请输入手机号"
            v-model="scope.row.mobile"
            size="small"
            clearable>
          </el-input>
          <p v-else>{{ scope.row.mobile }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="password"
        label="登录密码">
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.isAdd"
            placeholder="请输入密码"
            v-model="scope.row.password"
            size="small"
            clearable>
          </el-input>
          <p v-else>******</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="password"
        label="网站客服">
        <template slot-scope="scope">
          <el-switch
            :disabled="!(scope.row.isEdit || scope.row.isAdd)"
            v-model="scope.row.customerService"
            active-color="#13ce66"
            inactive-color="#999">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="password"
        label="管理员">
        <template slot-scope="scope">
          <el-switch
            :disabled="!(scope.row.isEdit || scope.row.isAdd)"
            v-model="scope.row.vipStatus"
            active-color="#13ce66"
            inactive-color="#999">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <template v-if="scope.row.isEdit">
            <el-button @click="cancelEdit(scope.row)" type="text" size="small" >取消</el-button>
            <el-button @click="confirmEdit(scope.row)" type="text" size="small" >确认</el-button>
          </template>
          <template v-if="!scope.row.isAdd">
            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
          </template>
          <template v-if="scope.row.isAdd || scope.row.isEdit">
            <el-button @click="addPerson(scope.row)" type="text" size="small">保存</el-button>
          </template>
          <template v-if="!scope.row.isEdit">
            <el-button type="text" size="small" @click="del(scope.row, scope.$index)">删除</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import utils from '@/common/utils/utils.js'

const getAllEmployees = '/zhonghe/user/getAllEmployees'
const updateEmployees = '/zhonghe/user/updateEmployees'
const deleteEmployees = '/zhonghe/user/deleteEmployees'
const addEmployees = 'zhonghe/user/addEmployees'

export default {
  data () {
    return {
      tableData: [{
        id: '666',
        mobile: '18678945678',
        nickname: '王小虎',
        editNam: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
        isEdit: false,
        vipStatus: 1,
        customerService: 0
      }]
    }
  },
  mounted () {
    console.log('加载页面')
    this.getAllEmployees()
  },
  methods: {
    addStaff () {
      this.tableData.push({
        nickname: '',
        isAdd: true,
        vipStatus: false,
        mobile: '',
        customerService: false
      })
    },
    getAllEmployees () {
      let params = {}
      this.$ajax(getAllEmployees, params, 'get').then(res => {
        if (res.statusCode === 200) {
          let objectData = res.objectData || {}
          let list = objectData.list && objectData.list.length ? objectData.list : []
          this.tableData = list.map(item => {
            item.vipStatus = Boolean(item.vipStatus)
            item.customerService = Boolean(item.customerService)
          })
        }
      })
    },
    addEmployees (item) {
      let params = [{
        nickname: item.nickname,
        vipStatus: item.vipStatus ? 1 : 0,
        password: utils.encrypt(item.password),
        mobile: item.mobile,
        customerService: item.customerService ? 1 : 0
      }]
      this.$ajax(addEmployees, params).then(res => {
        if (res.statusCode === 200) {
          this.$message.success('保存成功')
        }
      })
    },
    edit (item) {
      console.log('bianji', item)
      this.$set(item, 'isEdit', true)
    },
    cancelEdit (item) {
      this.$set(item, 'isEdit', false)
    },
    confirmEdit (item) {
      let params = [{
        nickname: item.nickname,
        vipStatus: item.vipStatus ? 1 : 0,
        password: utils.encrypt(item.password),
        mobile: item.mobile,
        id: item.id,
        customerService: item.customerService ? 1 : 0
      }]
      this.$ajax(updateEmployees, params).then(res => {
        if (res.statusCode === 200) {
          this.$message.success('编辑成功')
        }
      })
    },
    del (item, index) {
      console.log('删除索引', index)
      if (item.isAdd) {
        this.tableData.splice(index, 1)
      } else {
        this.$confirm('确认删除该员工信息？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteEmployees(item)
        }).catch(() => {
        })
      }
    },
    deleteEmployees (item) {
      let params = [{
        id: item.id,
        mobile: item.mobile
      }]
      this.$ajax(deleteEmployees, params).then(res => {
        if (res.statusCode === 200) {
          // let objectData = res.objectData || {}
          this.$message.success('删除成功')
          this.getAllEmployees()
        }
      }).catch((err) => {
        console.log('err--删除报错', err)
        this.$message.error('服务器连接失败')
      })
    }
  }
}
</script>

<style>

</style>
