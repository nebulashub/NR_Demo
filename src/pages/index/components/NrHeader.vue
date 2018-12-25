<template>
  <div class="container-fluid" id="container">
    <div id="content_container" class="container">
      <a id="a_logo" href="javascript:void(0)" v-on:click="goHome">
        <img id="logo" src="/nr/static/images/header_logo.png" srcset="/nr/static/images/header_logo@2x.png 2x" alt=""/>
      </a>
      <!--Right-->
      <div id="right_container" :class="isMobile ? 'right_container_m' : 'right_container'">
        <!--Search-->
        <div id="addr_err_container" v-show="showSearch">
          <div id="addr_err" class="center_container">{{addressErrorMsg}}</div>
        </div>
        <div id="search_container" v-show="showSearch">
          <input id="search_input" type="text" v-model="address" :placeholder="$t('ad_search_placeholder')"
                 @keyup.enter="search" @blur="checkAddress(false)"/>
          <a href="javascript:void(0)" v-on:click="search" style="float:left; height:40px">
            <div id="search_icon_container">
              <img id="search_icon" class="icon" src="/nr/static/images/search_dark.png"
                   srcset="/nr/static/images/search_dark@2x.png 2x" alt=""/>
            </div>
          </a>
        </div>
        <!--Links-->
        <a :class="isMobile ? 'link_m' : 'link'" href="https://github.com/nebulasio/nebnr" target="_blank" @click="downloadClick">
          {{$t('header_download_sdk')}}
          <img class="icon" src="/nr/static/images/download.png" srcset="/nr/static/images/download@2x.png 2x" alt=""/>
        </a>
        <a :class="isMobile ? 'link_m' : 'link'" href="https://nebulas.io" target="_blank">
          {{$t('header_official_website')}}
        </a>
        <div class="dropdown" style="height: 100%; float: left">
          <a href="#" :class="isMobile ? 'link_m' : 'link'" data-toggle="dropdown">
            {{ $appConfig.language === 'cn' ? '中文' : 'English' }}
            <img class="icon" src="/nr/static/images/pulldown.png" srcset="/nr/static/images/pulldown@2x.png 2x"
                 alt=""/>
          </a>
          <ul class="dropdown-menu">
            <li><a href="javascript:void(null)" @click="changeLanguage('cn')">中文</a></li>
            <li><a href="javascript:void(null)" @click="changeLanguage('en')">English</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import router from '../router/index'
import $ from 'jquery'
// import bs58 from 'bs58'
// import {SHA3} from 'sha3'
// import {Buffer} from 'buffer'

export default {
  name: 'NrHeader',
  props: ['allowSearch'],
  data () {
    return {
      showSearch: false,
      address: null,
      addressErrorMsg: '',
      addressErrorMsgKey: '',
      isMobile: false
    }
  },
  methods: {
    goHome: function () {
      router.replace('/')
    },
    changeLanguage: function (lang) {
      this.$appConfig.language = lang
      this.$i18n.locale = lang
      this.$event.$emit('languageChanged')
    },
    updateSearchVisible: function () {
      if (!this.allowSearch) {
        this.showSearch = false
      } else {
        this.showSearch = $('#content_container').width() > 1100
      }
    },
    search: function () {
      if (this.checkAddress(true)) {
        router.push({path: '/ad', query: {address: this.address.trim()}})
      }
    },
    checkAddress: function (needsCheckEmpty) {
      let ok = false
      let a = this.address ? this.address.trim() : ''
      if (!needsCheckEmpty && a.length === 0) {
        this.addressErrorMsgKey = null
        ok = true
      } else {
        if (needsCheckEmpty && a.length === 0) {
          this.addressErrorMsgKey = 'err_addr_empty'
        } else if (!a.startsWith('n1')) {
          this.addressErrorMsgKey = 'err_addr_n1'
        } else if (a.length !== 35) {
          this.addressErrorMsgKey = 'err_addr_length'
        // } else if (!/^[1-9A-HJ-NP-Za-km-z]{35}$/.test(this.address.trim()) || !this.checkBase58(a)) {
        } else if (!/^[1-9A-HJ-NP-Za-km-z]{35}$/.test(this.address.trim())) {
          this.addressErrorMsgKey = 'err_addr_not_neb'
        } else {
          this.addressErrorMsgKey = null
          ok = true
        }
      }
      this.updateAddressErrorMsg()
      return ok
    },
    // checkBase58: function (address) {
    //   let h = bs58.decode(address).toString('hex')
    //   let checkSum = h.substr(h.length - 8)
    //   let hash = new SHA3(256)
    //   hash.update(Buffer.from(h.substr(0, h.length - 8), 'hex'))
    //   return hash.digest('hex').startsWith(checkSum)
    // },
    updateAddressErrorMsg: function () {
      if (this.addressErrorMsgKey == null) {
        this.addressErrorMsg = ''
      } else {
        this.addressErrorMsg = this.$t(this.addressErrorMsgKey)
      }
    },
    downloadClick: function () {
      this.$ga.event('NRDemo', 'SDK_Download_Click', '', 1)
    },
    updateIsMobile: function () {
      this.isMobile = $('#container').width() <= 768
    }
  },
  mounted () {
    let self = this
    this.$event.$on('windowSizeChanged', function () {
      self.updateSearchVisible()
      self.updateIsMobile()
    })
    this.$event.$on('languageChanged', function () {
      self.updateAddressErrorMsg()
    })
    this.updateSearchVisible()
    this.updateIsMobile()
  }
}
</script>

<style scoped>
  #container {
    /*padding-top: 15px;*/
    /*padding-bottom: 15px;*/
  }

  #content_container {
    min-height: 80px;
  }

  #logo {
    float: left;
    width: 156px;
    height: 34px;
    position: relative;
    top: 23px;
  }

  .right_container {
    height: 40px;
    position: relative;
    float: right;
    top: 20px;
  }

  .right_container_m {
    height: 40px;
    margin-top: 50px;
    clear: both;
    position:relative;
    left: -15px;
  }

  /*Search*/

  #addr_err_container {
    width: 150px;
    height: 40px;
    float: left;
    color: #FF5151;
    font-size: 12px;
  }

  #addr_err {
    width: 150px;
    height: 40px;
    text-align: right
  }

  #search_container {
    height: 100%;
    float: left;
    background: white;
    padding-left: 20px;
    margin-left: 10px;
  }

  #search_input {
    width: 302px;
    height: 100%;
    border: 0px;
    outline: none;
    float: left;
  }

  #search_icon_container {
    height: 100%;
    padding-left: 10px;
    padding-right: 20px;
    float: left;
  }

  #search_icon {
    position: relative;
    top: 10px;
  }

  /*Common*/

  .icon {
    width: 16px;
    height: 16px;
  }

  .link {
    font-size: 16px;
    color: white;
    position: relative;
    float: left;
    top: 10px;
    margin-left: 40px;
  }

  .link_m {
    font-size: 16px;
    color: white;
    position: relative;
    float: left;
    top: 10px;
    margin-left: 15px;
  }

  .link img {
    position: relative;
    top: -3px;
  }

  .dropdown-menu a {
    height: 40px;
    line-height: 40px;
  }
</style>
