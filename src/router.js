
import userRouter from './modules/customer/user/router'
import platformRouter from './modules/platform/router'

const goodsView = r => require.ensure([], () => r(require('./modules/customer/goods')), 'goods')
const goodsListView = r => require.ensure([], () => r(require('./modules/customer/goodsList')), 'goodsList')
const patentDetails = r => require.ensure([], () => r(require('./modules/customer/patentDetails')), 'patentDetails')
const confirmOrder = r => require.ensure([], () => r(require('./modules/customer/confirmOrder')), 'confirmOrder')

let routes = [
  {path: '/', redirect: 'goods'},
  { path: '/goods', component: goodsView, name: 'goods' },
  { path: '/goodsList', component: goodsListView, name: 'goodsList' },
  { path: '/patentDetails', component: patentDetails, name: 'patentDetails' },
  { path: '/confirmOrder', component: confirmOrder, name: 'confirmOrder' },
  userRouter,
  ...platformRouter
]
export default routes
