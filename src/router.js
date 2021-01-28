import customer from './modules/customer/route'
const View = r => require.ensure([], () => r(require('./App')), 'src')
export default {
  path: 'mall',
  name: 'mall',
  component: View,
  children: [
    customer
  ]
}
