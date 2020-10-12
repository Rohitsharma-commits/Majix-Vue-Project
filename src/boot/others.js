import c from '../library/common.js'
import m from '../library/models.js'
import axios from 'axios'
// import D from '../../assets/oDReports.js'
// import S from '~assets/oDs.js'
import moment from 'moment'
// leave the export, even if you don't use it
Vue.prototype.$axios = axios
export default ({ app, router, Vue }) => {
  // something to do
  var bus = new Vue()
  Vue.prototype.$c = c
  Vue.prototype.$m = m
  // Vue.prototype.$oDReports = D
  // Vue.prototype.$oDs = S
  Vue.prototype.$mom = moment
  Object.defineProperties(Vue.prototype, { $bus: { get: function () { return bus } } })
}
