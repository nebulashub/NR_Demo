import Vue from 'vue'
import Router from 'vue-router'

import Home from '../sub_pages/Home'
import AddressDetail from '../sub_pages/AddressDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/ad',
      name: 'AddressDetail',
      component: AddressDetail
    }
  ]
})
