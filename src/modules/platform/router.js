const user = r => require.ensure([], () => r(require('./index')), 'platform')
const login = r => require.ensure([], () => r(require('./login/login')), 'login')
const productManage = r => require.ensure([], () => r(require('./pages/productManage')), 'productManage')
const staffManage = r => require.ensure([], () => r(require('./pages/staffManage')), 'staffManage')
let routes = [
  {
    path: '/adminLogin',
    component: login
  }, {
    path: '/platform',
    redirect: '/platform/productManage',
    component: user,
    children: [
      { path: '/platform/productManage', component: productManage, name: 'productManage' },
      { path: '/platform/staffManage', component: staffManage, name: 'staffManage' }
      // { path: '/platform/collects', component: collects, name: 'collects' }
    ]
  }]

export default routes
