import Vue from 'vue'
// import { clearCookie } from './common/utils/utils'
const URL_LOGOUT = '/nine/user/logout'

const state = {
  // 登陆人信息
  userInfo: {
    loginFlag: true
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
  },
  logout (context, payload) {
    // 暂时
    window.localStorage.removeItem('zhongheUser')
    context.commit('updateUserInfo', { loginFlag: false })
    return new Promise((resolve, reject) => {
      Vue.prototype.$ajax(URL_LOGOUT).then((res) => {
        console.log('res===', res)
        if (res.statusCode === 200) {
          window.localStorage.removeItem('zhongheUser')
          context.commit('updateUserInfo', { loginFlag: false })
          // clearCookie()
        } else {
          reject(res)
        }
      }).catch(
        e => {
          reject(e)
        }
      )
    })
  }
}

export default {
  state,
  actions,
  mutations
}
