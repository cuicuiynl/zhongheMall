<template>
  <div>
    <div class="nav-wrap">
        <companyLogo></companyLogo>
        <div class="nav-tab">
            <div class="tab-item"  :class="{'tab-active': item.value == activedTab}"
            @click="changeTab(item.value)"
            v-for="item in tabs" :key="item.value">{{item.label}}</div>
        </div>
        <div class="login-zone">
          <slot name="right"></slot>
        </div>
    </div>
  </div>
</template>

<script>
import companyLogo from './companyLogo'
import { mapState } from 'vuex'
export default {
  name: 'headerNav',
  components: {
    companyLogo
  },
  props: {
    tabs: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      activedTab: state => state.activedTab
    })
  },
  mounted () {
  },
  methods: {
    changeTab (val) {
      this.activedTab = val
    }
  }
}
</script>

<style lang="less" scoped>
.nav-wrap{
    width: 1190px;
    height: 80px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    position: relative;
}
.nav-tab{
    display: flex;
    margin-left: 20px;
    height: 40px;
    .tab-item{
      padding: 0 20px;
      font-size: 16px;
      font-weight: 400;
      color: #333;
      text-align: center;
      line-height: 40px;
      cursor: pointer;
      position: relative;
    }
    .tab-item:hover{
      &::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 4px;
        background: #199fff;
        border-radius: 3px;
        left: 50%;
        transform: translateX(-50%);
        bottom: 3px;
    }
    }
    .tab-active{
      color: #333;
      font-weight: 500;
      position: relative;
    }
    .tab-active::after {
      content: '';
      position: absolute;
      width: 20px;
      height: 4px;
      background: #199fff;
      border-radius: 3px;
      left: 50%;
      transform: translateX(-50%);
      bottom: 3px;
  }
}
.login-zone{
    display: flex;
    align-items: center;
    color: #666;
    font-size: 14px;
    line-height: 40px;
    position: absolute;
    right: 0;
}
</style>
