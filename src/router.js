const goodsView = r => require.ensure([], () => r(require('./modules/customer/goods')), 'goods')
const goodsListView = r => require.ensure([], () => r(require('./modules/customer/goodsList')), 'goodsList')
let routes = [
  {path: '/', redirect: 'goods'},
  { path: '/goods', component: goodsView, name: 'goods' },
  { path: '/goodsList', component: goodsListView, name: 'goodsList' }
]
export default routes
