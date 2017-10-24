import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import goods from 'components/goods/goods'
import ratings from 'components/ratings/ratings'
import 'common/stylus/index.styl'
Vue.use(VueRouter)
Vue.use(VueResource)
let app = Vue.extend(
  App
)
// you can enable the emulateJSON option. This will send the request as application/x-www-form-urlencoded MIME type
Vue.http.options.emulateJSON = true
Vue.http.options.root = '/root'
Vue.http.headers.common['Authorization'] = 'Basic YXBpOnBhc3N3b3Jk'
// Vue.http.options.emulateHTTP = true
let router = new VueRouter({
  linkActiveClass: 'active'
})
router.map({
  '/goods': {
    component: goods
  },
  '/ratings': {
    component: ratings
  }
})
router.start(app, '#app')
