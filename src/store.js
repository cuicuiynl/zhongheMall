import Vue from 'vue'
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
    return new Promise((resolve, reject) => {
      Vue.prototype.$ajax(URL_LOGOUT).then((res) => {
        console.log('res===', res)
        if (res.statusCode === 200) {
          window.localStorage.removeItem('userInfo')
          context.commit('updateUserInfo', { loginFlag: false })
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
