const user = r => require.ensure([], () => r(require('./index')), 'platform')
const login = r => require.ensure([], () => r(require('./pages/login')), 'login')
const productManage = r => require.ensure([], () => r(require('./pages/productManage')), 'productManage')

let routes = {
  path: '/platform',
  redirect: '/platform/login',
  component: user,
  children: [
    { path: '/platform/login', component: login, name: 'login' },
    { path: '/platform/productManage', component: productManage, name: 'productManage' }
    // { path: '/platform/shoppingCard', component: shoppingCard, name: 'shoppingCard' },
    // { path: '/platform/collects', component: collects, name: 'collects' }
  ]
}

export default routes
