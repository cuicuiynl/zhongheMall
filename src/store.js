// import Vue from 'vue'
// import { clearCookie } from './common/utils/utils'

const state = {
  /**
   * 角色
   * 1 admin
   * 2 employee
   * 3 customer
   */
  // 登陆人信息
  userInfo: {
    loginFlag: false
  },

  activedTab: 'goods'
}
const mutations = {
  updateUserInfo (state, payload) {
    state.userInfo = payload
  },
  updateActivedTab (state, payload) {
    state.activedTab = payload
  }
}
const actions = {
  updateUserInfoAction (context, payload) {
    context.commit('updateUserInfo', payload)
  },
  updateActivedTabAction (context, payload) {
    context.commit('updateActivedTab', payload)
  }
}

export default {
  state,
  actions,
  mutations
}
