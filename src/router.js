const goodsView = r => require.ensure([], () => r(require('./modules/customer/goods')), 'goods')
const goodsListView = r => require.ensure([], () => r(require('./modules/customer/goodsList')), 'goodsList')
const patentDetails = r => require.ensure([], () => r(require('./modules/customer/patentDetails')), 'patentDetails')
let routes = [
  {path: '/', redirect: 'goods'},
  { path: '/goods', component: goodsView, name: 'goods' },
  { path: '/goodsList', component: goodsListView, name: 'goodsList' },
  { path: '/patentDetails', component: patentDetails, name: 'patentDetails' }
]
export default routes
