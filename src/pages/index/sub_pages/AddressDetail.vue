<template>
  <div id="container">

    <div style="background: black">
      <nr-header :allow-search="true"></nr-header>
    </div>

    <div id="result_container" v-show="showResult">
      <div id="content_container">

        <div id="title_container">

          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div id="title">{{$t('ad_neb_address_title')}}</div>
                <div id="address_container">
                  <a id="a_address" target="_blank">
                    {{ $route.query.address }}
                    <img id="address_arrow" src="/nr/static/images/ad_address_arrow.png"
                         srcset="/nr/static/images/ad_address_arrow@2x.png 2x" alt=""/>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div id="charts_container" class="container">
          <div class="row">

            <div class="col-md-5 charts_cell">
              <div :class="{'value_container_m':isMobile, 'center-horizontal':isMobile, 'value_container':!isMobile}">
                <div id="current_title">
                  {{$t('ad_current_nr_title')}}
                </div>
                <div id="current">
                  {{currentValue}}
                </div>
                <div id="zero_desc" v-show="showZero">
                  {{$t('ad_zero_desc')}}
                </div>
                <div id="value_desc_container">
                  <div id="img_value_desc">
                    <img src="/nr/static/images/ad_value_tips.png"
                         srcset="/nr/static/images/ad_value_tips@2x.png 2x" alt=""/>
                  </div>
                  <div id="value_desc">
                    {{$t('ad_value_desc')}}
                  </div>
                </div>

                <div id="last_title" v-show="showLast">
                  {{$t('ad_last_nr_title')}}
                </div>
                <div id="last_detail" v-show="showLast">
                  {{lastDate}}<br/>
                  {{lastNr}}
                </div>
              </div>
            </div>

            <div class="col-md-7 charts_cell">
              <div class="center-block" :class="isMobile?'charts_title_container_m':'charts_title_container'">
                <div id="charts_title_left">
                  {{$t('ad_last_seven_day_nr_title')}}
                </div>
                <div id="charts_title_right">
                  {{$t('ad_nr_update_time')}}
                </div>
              </div>
              <div id="graph" class="center-block" :class="isMobile ? 'graph_m' : 'graph'">
                <div id="charts" style="width:100%"></div>
              </div>
            </div>

          </div>
        </div>

      </div>

      <about></about>

    </div>

    <div id="error_container" v-show="showError">
      <div id="error_desc">{{errorMsg}}</div>
      <img id="error_img" :class="errIsNotFound ? 'err_not_found' : 'err_net'"
           :src="errIsNotFound ? '/nr/static/images/err_not_found@2x.png' : '/nr/static/images/err_net@2x.png'"
           alt=""><br/>
      <button id="btn_back" v-on:click="goHome">{{$t('err_go_home')}}</button>
    </div>

    <div id="space" v-show="!showResult&&!showError">
      <div id="loading_container" class="center-block">
        <lottie :options="defaultOptions" :height="100" :width="100" v-on:animCreated="handleAnimation"/>
      </div>
    </div>

    <nr-footer></nr-footer>

  </div>
</template>

<script>

import NrHeader from '../components/NrHeader'
import NrFooter from '../components/NrFooter'
import About from '../components/About'
import $ from 'jquery'
import '../../../common/util'
import Highcharts from 'highcharts'
import router from '../router/index'

import Lottie from 'vue-lottie'
import * as animationData from '../../../assets/lottie/loading.json'
import format from 'string-format'

const options = {
  chart: {
    type: 'areaspline'
  },
  title: {
    text: ''
  },
  subtitle: {
    text: ''
  },
  xAxis: {
    // type: 'category'
    categories: []
  },
  yAxis: {
    title: {
      text: 'NR Value'
    },
    labels: {
      formatter: function () {
        return this.value.toString().nr_value()
      }
    }
  },
  tooltip: {
    backgroundColor: '#3355ff',
    color: '#FFFFFF',
    borderWidth: 0,
    borderRadius: 0,
    headerFormat: '<div style="color: white;">{point.key}</div><br/>',
    pointFormat: '<div style="color: white;">NR Value: {point.y:,.6f}</div>',
    footerFormat: ''
  },
  credits: {
    enabled: false
  },
  plotOptions: {
    areaspline: {
      fillOpacity: 0.3, // 指定所有面积图的透明度
      marker: {
        symbol: 'circle',
        radius: 3,
        lineColor: '#3355ff',
        lineWidth: 1
      }
    }
  },
  series: []
}

function updateCharts (nrData, language, nrValueTitle) {
  let days = []
  let values = []
  let b = false
  let allZero = true
  for (let i in nrData.lastSevenDays) {
    let k = nrData.lastSevenDays[i][0]
    let v = nrData.lastSevenDays[i][1]
    if (language === 'cn') {
      days.push(new Date(k * 1000).format('MM/dd'))
    } else {
      days.push(new Date(k * 1000).format('MMM dd'))
    }
    let val = v ? v.score.nr_float_value() : 0
    if (val > 0 && val < 1) {
      b = true
    }
    if (val > 0) {
      allZero = false
    }
    values.push(val)
  }
  if (b) {
    options.tooltip.pointFormat = '<div style="color: white;">' + nrValueTitle + ': {point.y:,.1f}</div>'
  } else {
    options.tooltip.pointFormat = '<div style="color: white;">' + nrValueTitle + ': {point.y:,.0f}</div>'
  }
  options.yAxis.title.text = nrValueTitle
  options.xAxis.categories = days

  let charts = Highcharts.chart('charts', options)
  charts.addSeries({
    name: nrValueTitle,
    data: values
  })

  return allZero
}

export default {
  name: 'AddressDetail',
  components: {About, NrFooter, NrHeader, Lottie},
  data () {
    return {
      showError: false,
      showResult: false,
      showZero: false,
      showLast: true,

      errIsNotFound: false,

      addressTitle: '',
      errorMsg: '',

      currentValue: '',
      lastDateValue: null,
      lastDate: '',
      lastNrValue: '',
      lastNr: '',

      isMobile: false,

      errorMsgKey: '',
      nrData: null,

      defaultOptions: {animationData: animationData},
      animationSpeed: 1
    }
  },
  methods: {
    loadData: function () {
      let a = this.$route.query.address.toLowerCase()
      if (!a.startsWith('0x')) {
        a = this.$route.query.address
      }
      let self = this
      this.$api.getAddressInfo(a, function (result) {
        if (result.success()) {
          if (result.data.last) {
            self.nrData = result.data

            self.showResult = true
            self.showError = false

            self.errorMsgKey = null
            self.updateErrorMsg()
            self.updateValues()
          } else {
            self.showResult = false
            self.showError = true
            self.errIsNotFound = true

            self.errorMsgKey = 'ad_no_result'
            self.updateErrorMsg()
          }
        } else {
          self.showResult = false
          self.showError = true
          self.errIsNotFound = false

          self.errorMsgKey = 'ad_net_error'
          self.updateErrorMsg()
        }
      })
    },
    updateAddress: function () {
      let a = this.$route.query.address
      if (!a) {
        return
      }
      if (a.startsWith('0x')) {
        $('#a_address').attr('href', 'https://etherscan.io/address/' + a)
        this.addressTitle = this.$t('ad_eth_address_title')
      } else {
        $('#a_address').attr('href', 'https://explorer.nebulas.io/#/address/' + a)
        this.addressTitle = this.$t('ad_neb_address_title')
      }
    },
    updateErrorMsg: function () {
      this.errorMsg = this.errorMsgKey ? this.$t(this.errorMsgKey) : ''
    },
    updateValues: function () {
      let c = this.nrData ? this.nrData.current : null
      let val = c ? c.score.nr_float_value() : 0
      this.currentValue = c ? (parseFloat(c.score) < 0.05 ? '≈0' : c.score.nr_value()) : '0'
      this.showZero = this.currentValue === '0'
      this.showLast = val === 0

      let last = this.nrData ? this.nrData.last : null
      if (last) {
        if (this.nrData.last.score.nr_float_value() === 0) {
          this.lastDateValue = null
          this.lastDate = '--'
          this.lastNrValue = '--'
          this.showLast = false
        } else {
          this.lastDateValue = last.date
          this.lastNrValue = last.score.nr_value()
        }
      } else {
        this.lastDateValue = null
        this.lastDate = ''
        this.lastNrValue = ''
        this.showLast = false
      }
      this.updateGraph()
      this.updateLastDate()
    },
    updateGraph: function () {
      updateCharts(this.nrData, this.$appConfig.language, this.$t('ad_nr_value'))
    },
    updateIsMobile: function () {
      this.isMobile = $('#content_container').width() <= 768
    },
    updateLastDate: function () {
      if (this.lastDateValue == null) {
        this.lastDate = '--'
      } else {
        let date = null
        if (this.$appConfig.language === 'cn') {
          date = Date.from('yyyyMMdd', this.lastDateValue).format('yyyy年MM月dd日')
        } else {
          date = Date.from('yyyyMMdd', this.lastDateValue).format('MMM dd, yyyy')
        }
        this.lastDate = format(this.$t('ad_last_nr_date'), date)
      }
      if (this.lastNrValue == null) {
        this.lastNr = ''
      } else {
        this.lastNr = format(this.$t('ad_last_nr_value'), this.lastNrValue)
      }
    },
    goHome: function () {
      router.replace('/')
    },
    handleAnimation: function (anim) {
      this.anim = anim
    }
  },
  watch: {
    '$route': function (to, from) {
      this.loadData()
      this.updateAddress()
    }
  },
  mounted: function () {
    this.updateAddress()
    this.loadData()
    this.updateIsMobile()
    let self = this
    this.$event.$on('languageChanged', function () {
      self.updateAddress()
      self.updateErrorMsg()
      self.updateLastDate()
      self.updateGraph()
    })
    this.$event.$on('windowSizeChanged', function () {
      self.updateIsMobile()
    })
    this.$ga.event('NRDemo', 'Search', '', 1)
  }
}
</script>

<style scoped>

  #container {
  }

  #content_container {
    background: white;
  }

  #title_container {
    background-color: #333;
    background-image: url('/nr/static/images/detail_title_bg.png');
    background-size: cover;
    background-repeat: no-repeat;
    padding-top: 18px;
    padding-bottom: 18px;
    text-align: left;
    color: white;
  }

  @media only screen and (-webkit-min-device-pixel-ratio: 2) {
    #title_container {
      background-image: url('/nr/static/images/detail_title_bg@2x.png');
    }
  }

  #title {
    font-size: 18px;
    font-weight: bold;
  }

  #address_container {
    font-size: 18px;
    margin-top: 12px;
  }

  #address_container a {
    color: #33AAFF;
    text-decoration: none;
  }

  #address_container a:hover {
    color: #33AAFF;
    text-decoration: underline;
  }

  #a_address {
  }

  #address_arrow {
    width: 16px;
    height: 16px;
    margin-top: -3px;
  }

  #charts_container {
    padding-bottom: 30px;
  }

  .value_container {
    height: 420px;
    padding: 0 20px;
    text-align: left;
    margin-top: 38px;
  }

  .value_container_m {
    height: auto;
    text-align: center;
    padding: 0 20px;
  }

  #current {
    font-size: 46px;
    font-weight: bold;
  }

  #current_title {
    font-size: 16px;
  }

  #zero_desc {
    color: #3355FF;
    font-size: 12px;
  }

  #value_desc_container {
    margin-top: 10px;
    position: relative;
  }

  #img_value_desc {
    width: 16px;
    height: 16px;
  }

  #value_desc {
    position: relative;
    font-size: 12px;
    left: 25px;
    top: -14px;
    line-height: 20px;
  }

  #last_title {
    font-size: 12px;
    font-weight: bold;
    margin-top: 30px;
  }

  #last_detail {
    font-size: 12px;
    margin-top: 5px;
    line-height: 20px;
  }

  .charts_cell {
    margin-top: 46px;
  }

  .charts_title_container {
    height: 20px;
    position: relative;
    padding-left: 35px;
    padding-right: 10px;
    margin-bottom: 22px;
  }

  .charts_title_container_m {
    height: 20px;
    width: 300px;
    position: relative;
    padding-left: 35px;
    padding-right: 10px;
    margin-bottom: 22px;
  }

  #charts_title_left {
    position: relative;
    font-size: 16px;
    float: left;
    line-height: 20px;
  }

  #charts_title_right {
    position: relative;
    color: #999;
    font-size: 12px;
    float: right;
    line-height: 20px;
  }

  #graph_title {
    font-size: 20px;
    font-weight: bold;
  }

  .graph {
    width: 100%;
    background: #ccc;
  }

  .graph_m {
    width: 300px;
    /*height: 300px;*/
    background: #ccc;
    margin-top: 60px;
  }

  #error_container {
    padding-top: 60px;
    padding-bottom: 266px;
  }

  .err_net {
    width: 350px;
    height: 357px;
    margin-top: 50px;
  }

  .err_not_found {
    width: 308px;
    height: 182px;
    margin-top: 50px;
  }

  #error_desc {
    font-size: 18px;
    font-weight: bold;
    color: #555;
  }

  #space {
    min-height: 850px;
    padding-top: 260px;
  }

  #btn_back {
    height: 40px;
    background: transparent;
    border: solid 1px black;
    margin-top: 40px;
    padding: 0 15px;
    outline: none;
  }

  #loading_container {
    width: 100px;
    height: 100px;
  }

</style>
