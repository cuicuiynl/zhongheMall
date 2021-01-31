<template>
  <div class="account-wrap">
    <div class="user-head">
      <div class="user-head-left">
        <div class="head-img">
          <span class="change-head-icon zh-theme">更换头像</span>
        </div>
        <div>
          <p class="mb10 flex-v-center">
            <span class="head-account">会员1111</span>
            <span>普通会员</span>
            <img src="/static/imgs/vipLog.png" class="vip-img">
          </p>
          <p class="vip-expire-time">到期时间：2080-06-26</p>
          <p class="user-point">175分</p>
        </div>
      </div>
      <div class="user-head-right" @click="payVip">
        <div class="dark-button">立即续费</div>
      </div>
    </div>
    <div class="account-set">
      <p class="head">账户设置</p>
      <p class="mb10"><span class="label">用户名</span></p>
      <p class="mb10"><span class="label">昵称</span></p>
      <p><span class="label">修改密码</span></p>
    </div>
    <div class="payment-record">
      <p class="head">充值记录</p>
      <el-table
        :data="tableData"
        stripe
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="付款时间">
        </el-table-column>
        <el-table-column
          prop="orderNo"
          label="订单号">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="num"
          label="金额">
        </el-table-column>
        <el-table-column
          label="状态"
          prop="status">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'account',
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        type: '333',
        orderNo: '王小虎',
        num: '222222',
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
    // 开通或续费会员
    payVip () {}
  }
}
</script>

<style lang="less" scoped>
.account-wrap{
  padding: 20px;
}
.user-head{
  background-color: #465069;
  border-radius: 4px;
  padding: 3% 5% 0;
  display: flex;
  justify-content: space-between;
}
.user-head-left{
  display: flex;
  color: #fff;
  .head-img{
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 1.4em;
    background: #daf6fa;
    &:hover .change-head-icon{
      visibility: visible;
      transition: 0.3s;
    }
  }
  .change-head-icon{
    visibility: hidden;
    display: block;
    cursor: pointer;
    height: 0;
    line-height: 80px;
    text-align: center;
    transition: 0.3s;
  }
  .vip-img{
    margin-left: 5px;
    border-radius: 8px;
  }
  .head-account{
    font-size: 20px;
    margin-right: 5px;
  }
  .vip-expire-time{
    margin-bottom: 10px;
  }
  .user-point{
    color: #ffc481;
  }
}
.user-head-right{
  width: 340px;
  height: 130px;
  background-image: url(/static/imgs/vipCardBg.png);
  background-size: cover;
  background-repeat: no-repeat;
  text-align: right;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  color: #af7231;
  font-size: 12px;
  cursor: pointer;
}
.dark-button{
  font-size: 14px;
  color: #ffead2;
  padding: .4em 1.5em;
  background-color: #465069;
  border: none;
  border-radius: 2em;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.account-set{
  margin-top: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px dashed #ddd;
  margin-bottom: 20px;
  border-top: 1px dashed #ddd;
}
.head{
  font-size: 16px;
  padding-bottom: 10px;
}
</style>
