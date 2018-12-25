import Vue from 'vue'
import {Api} from './api'
import appConfig from './config'

let _nrGlobalEvent = new Vue()

export default {
  install (Vue, options) {
    if (!Vue.prototype.hasOwnProperty('$event')) {
      Object.defineProperty(Vue.prototype, '$event', {
        get: function get () {
          return _nrGlobalEvent
        }
      })
    }

    Vue.$browserLanguage = function () {
      let lang = navigator.language || navigator.userLanguage
      return lang.toLowerCase().startsWith('zh') ? 'cn' : 'en'
    }
    if (!Vue.prototype.hasOwnProperty('$browserLanguage')) {
      Object.defineProperty(Vue.prototype, '$browserLanguage', {
        get: function get () {
          return Vue.$browserLanguage()
        }
      })
    }

    Vue.$appConfig = appConfig
    if (!Vue.prototype.hasOwnProperty('$appConfig')) {
      Object.defineProperty(Vue.prototype, '$appConfig', {
        get: function get () {
          return appConfig
        }
      })
    }

    Vue.$api = Api
    if (!Vue.prototype.hasOwnProperty('$api')) {
      Object.defineProperty(Vue.prototype, '$api', {
        get: function get () {
          return Api
        }
      })
    }
  }
}
