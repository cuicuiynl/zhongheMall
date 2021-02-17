<template>
  <el-button :type="btnType" size="small" @click="tip">加入购物车</el-button>
</template>

<script>
export default {
  props: {
    btnType: {
      default: 'defaut',
      type: String
    },
    PartentInfo: {
      default: () => {
        return {}
      },
      type: Object
    }
  },
  methods: {
    tip () {
      this.$alert('请联系高先生：13342903057 进行后续购买流程', '提示', {
        confirmButtonText: '确定',
        callback: action => {}
      })
    }
  }
}
</script>

<style>

</style>
