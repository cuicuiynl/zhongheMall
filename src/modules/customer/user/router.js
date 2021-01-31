const user = r => require.ensure([], () => r(require('./index')), 'user')
const myOrder = r => require.ensure([], () => r(require('./myOrder')), 'myOrder')
const collects = r => require.ensure([], () => r(require('./collects')), 'collects')
const account = r => require.ensure([], () => r(require('./account')), 'account')

let routes = {
  path: '/user',
  redirect: '/user/account',
  component: user,
  children: [
    { path: '/user/account', component: account, name: 'account' },
    { path: '/user/myOrder', component: myOrder, name: 'myOrder' },
    { path: '/user/collects', component: collects, name: 'collects' }
  ]
}

export default routes
