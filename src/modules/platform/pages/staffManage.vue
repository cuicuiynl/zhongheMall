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
        prop="name"
        label="员工姓名">
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.isEdit || scope.row.isAdd"
            placeholder="请输入姓名"
            v-model="scope.row.editNam"
            size="small"
            clearable>
          </el-input>
          <p v-else>{{ scope.row.name }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="账号">
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.isEdit || scope.row.isAdd"
            placeholder="请输入账号"
            v-model="scope.row.account"
            size="small"
            clearable>
          </el-input>
          <p v-else>{{ scope.row.account }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号">
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.isEdit || scope.row.isAdd"
            placeholder="请输入手机号"
            v-model="scope.row.phone"
            size="small"
            clearable>
          </el-input>
          <p v-else>{{ scope.row.phone }}</p>
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
            v-model="scope.row.isService"
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
            v-model="scope.row.isAdmin"
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
          <el-button @click="cancelEdit(scope.row)" type="text" size="small" v-if="scope.row.isEdit">取消</el-button>
          <el-button @click="edit(scope.row)" type="text" size="small" v-else>编辑</el-button>
          <el-button type="text" size="small" @click="del(scope.row, scope.row.index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
const staffListUrl = ''
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        editNam: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
        isEdit: false,
        isAdmin: false
      }]
    }
  },
  methods: {
    addStaff () {
      this.tableData.push({
        name: '',
        isAdd: true,
        isAdmin: false
      })
    },
    getStaffList () {
      let params = {}
      this.$ajax(staffListUrl, params).then(res => {
        if (res.statusCode === 200) {
          let objectData = res.objectData || {}
          this.tableData = objectData.productEntityList && objectData.productEntityList.length ? objectData.productEntityList : []
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
    del (item, index) {
      if (item.isAdd) {
        this.tableData.splice(index, 1)
      }
    }
  }
}
</script>

<style>

</style>
