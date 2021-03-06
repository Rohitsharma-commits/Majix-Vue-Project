import Vue from 'vue'
import Vuex from 'vuex'
import '../assets/js/jquery-3.5.1.min.js'
import '../assets/js/bootstrap.bundle.min.js'
import '../assets/vendor/owl-carousel/js/owl.carousel.min.js'
import '../assets/vendor/wow/wow.min.js'
import '../assets/js/mobster.js'
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyClvW8YiW20sD46lgIN9AFBvwjqhDWc4qU',
    libraries: 'places'
  }
})
// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
