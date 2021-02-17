<template>
  <el-button :type="btnType" size="small" @click="tip">立即购买</el-button>
</template>

<script>
export default {
  props: {
    btnType: {
      default: 'danger',
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
