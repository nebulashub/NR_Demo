<template>
  <div id="container">
    <div id="title0">Nebulas NOVA</div>
    <div id="title1">{{$t('search_title')}}</div>
    <div id="search_container1" class="center-block">
      <div style="height: 16px;margin-bottom: 10px">
        <div id="addr_err_container">{{addressErrorMsg}}</div>
      </div>
      <div id="search_container">
        <input id="search_input" v-model="address" type="text" @blur="checkAddress(false)"
               :placeholder="$t('search_placeholder')"
               v-on:keyup.enter="search"/>
        <a href="javascript:void(0)" v-on:click="search">
          <div id="search_btn_container">
            <div id="search_line"></div>
            <div id="search_icon_container">
              <img id="search_icon" src="/nr/static/images/search.png" srcset="/nr/static/images/search@2x.png 2x"
                   alt=""/>
            </div>
          </div>
        </a>
      </div>

      <button id="btn_random" style="float: left" v-show="showRandom" v-on:click="random">
        {{$t('search_btn_random')}}
      </button>
    </div>

    <div id="support_eth">{{$t('search_support_eth')}}</div>
  </div>
</template>

<script>

import router from '../router/index'
import {Platform} from '../../../common/api'
// import bs58 from 'bs58'
// import {SHA3} from 'sha3'
// import {Buffer} from 'buffer'

export default {
  name: 'Search',
  data () {
    return {
      address: null,
      showRandom: false,
      randomAddresses: [],
      addressErrorMsg: '',
      addressErrorMsgKey: ''
    }
  },
  methods: {
    search: function () {
      if (this.checkAddress(true)) {
        router.push({path: '/ad', query: {address: this.address.trim()}})
      }
    },
    random: function () {
      this.address = this.randomAddresses[parseInt(Math.random() * this.randomAddresses.length)]
      this.checkAddress(true)
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
    }
  },
  mounted () {
    let self = this
    this.$api.getRandomAddresses(Platform.Neb, function (result) {
      if (result.success()) {
        self.$appConfig.randomAddresses = result.data
        self.randomAddresses = result.data
        self.showRandom = true
      }
    })
    if (this.$appConfig.randomAddresses.length > 0) {
      self.randomAddresses = self.$appConfig.randomAddresses
      self.showRandom = true
    }
    this.$event.$on('languageChanged', function () {
      self.updateAddressErrorMsg()
    })
  }
}

</script>

<style scoped>
  #container {
    padding-bottom: 40px;
  }

  #title0 {
    margin-top: 113px;
    font-size: 24px;
    color: white;
  }

  #title1 {
    margin-top: 9px;
    font-size: 40px;
    font-weight: bold;
    color: white;
  }

  #search_container1 {
    height: 60px;
    min-width: 300px;
    max-width: 730px;
    /*position: relative;*/
    margin-top: 44px;
  }

  #search_container {
    height: 60px;
    position: relative;
    /*border: #ffffff66 1px solid;*/
    box-shadow: 0 0 0 1px rgba(255, 255, 255, .4);
    background: rgba(255, 255, 255, .13);
    padding-left: 20px;
  }

  #search_input {
    width: 100%;
    height: 100%;
    color: white;
    background: transparent;
    font-size: 16px;
    border-width: 0;
    outline: none;
    padding-right: 60px;
    float: left;
  }

  #search_btn_container {
    position: absolute;
    height: 60px;
    right: 0;
  }

  #search_line {
    width: 1px;
    background: #ffffff;
    opacity: 0.4;
    height: 24px;
    margin-top: 18px;
    float: left;
  }

  #search_icon_container {
    padding-left: 18px;
    padding-right: 18px;
    float: left;
  }

  #search_icon {
    width: 24px;
    height: 24px;
    margin-top: 18px;
    float: left;
  }

  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: white;
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: white;
  }

  ::-ms-input-placeholder { /* Microsoft Edge */
    color: white;
  }

  #btn_random {
    font-size: 12px;
    padding-left: 20px;
    padding-right: 20px;
    height: 26px;
    color: white;
    background: transparent;
    border-width: 0;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, .4);
    margin-top: 10px;
    outline: none;
  }

  #btn_random:hover {
    background: rgba(255, 255, 255, .16);
  }

  #support_eth {
    font-size: 14px;
    color: white;
    margin-top: 87px;
    opacity: 0.6;
  }

  #addr_err_container {
    color: #FF5151;
    font-size: 12px;
    margin-bottom: 10px;
    text-align: left;
  }

</style>
