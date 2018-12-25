// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import 'bootstrap/dist/js/bootstrap.min.js'
import VueI18n from 'vue-i18n'
import VueCookie from 'vue-cookie'
import messages from './strings/strings'
import ext from '../../common/ext'
// import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false

Vue.use(VueI18n)
Vue.use(VueCookie)
Vue.use(ext)

const i18n = new VueI18n({
  messages
})
i18n.locale = Vue.$appConfig.language

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  i18n
})
