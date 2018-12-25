import VueCookie from 'vue-cookie'
import Vue from 'vue'

const appConfig = new Vue({
  data () {
    return {
      lang: null,
      randomAddr: null
    }
  },
  computed: {
    language: {
      get: function () {
        if (this.lang) {
          return this.lang
        }
        let l = VueCookie.get('language')
        if (!l) {
          l = Vue.$browserLanguage()
        }
        return l
      },
      set: function (lang) {
        VueCookie.set('language', lang)
        this.lang = lang
      }
    },
    randomAddresses: {
      get: function () {
        if (this.randomAddr) {
          return this.randomAddr
        }
        let strAddresses = VueCookie.get('random_addresses')
        if (strAddresses) {
          return JSON.parse(strAddresses)
        } else {
          return []
        }
      },
      set: function (addresses) {
        VueCookie.set('random_addresses', JSON.stringify(addresses))
        this.randomAddr = addresses
      }
    }
  }
})

export default appConfig
