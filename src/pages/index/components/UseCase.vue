<template>
  <div id="container">
    <div id="title">{{$t('use_case_title')}}</div>
    <div id="content_container" class="container">

      <div class="row">

        <div class="col-md-6">
          <div :class="isMobile ? 'cell_m' : (isZh ? 'cell_zh' : 'cell_en')">
            <a id="a_dip" class="a_block" href="https://nebulas.io" target="_blank">
              <div>
                <div :class="isMobile ? 'col_title_container_m' : 'col_title_container'">
                  <span class="col_title center-vertical">{{$t('use_case_dip_title')}}</span>
                  <img :class="isMobile ? 'col_title_icon_m' : 'col_title_icon'"
                       src="/nr/static/images/use_case_dip.png"
                       srcset="/nr/static/images/use_case_dip@2x.png 2x"
                       alt=""/>
                </div>
                <div class="col_desc">
                  {{$t('use_case_dip_content')}}
                </div>
                <div :class="isMobile ? 'col_bottom_container_m' : 'col_bottom_container'">
                  <div class="col_bottom_text center-vertical">{{$t('use_case_dip_keys')}}</div>
                  <div class="col_bottom_more center-vertical" href="">{{$t('use_case_more')}}&gt;</div>
                </div>
              </div>
            </a>
          </div>
        </div>

        <div class="col-md-6">
          <div :class="isMobile ? 'cell_m' : (isZh ? 'cell_zh' : 'cell_en')">
            <a class="a_block" href="https://atlasp.io/" target="_blank">
              <div>
                <div :class="isMobile ? 'col_title_container_m' : 'col_title_container'">
                  <span class="col_title center-vertical">{{$t('use_case_atp_title')}}</span>
                  <img :class="isMobile ? 'col_title_icon_m' : 'col_title_icon'"
                       src="/nr/static/images/use_case_atp.png"
                       srcset="/nr/static/images/use_case_atp@2x.png 2x" alt=""/>
                </div>
                <div class="col_desc">
                  {{$t('use_case_atp_content')}}
                </div>
                <div :class="isMobile ? 'col_bottom_container_m' : 'col_bottom_container'">
                  <div class="col_bottom_text center-vertical">{{$t('use_case_atp_keys')}}</div>
                  <div class="col_bottom_more center-vertical" href="">{{$t('use_case_more')}}&gt;</div>
                </div>
              </div>
            </a>
          </div>
        </div>

      </div>

      <div class="row">

        <div class="col-md-6">
          <div :class="isMobile ? 'cell_m' : (isZh ? 'cell_zh' : 'cell_en')">
            <a class="a_block" href="http://www.searchain.io/" target="_blank">
              <div>
                <div :class="isMobile ? 'col_title_container_m' : 'col_title_container'">
                  <span class="col_title center-vertical">Searchain</span>
                  <img :class="isMobile ? 'col_title_icon_m' : 'col_title_icon'"
                       src="/nr/static/images/use_case_sc.png"
                       srcset="/nr/static/images/use_case_sc@2x.png 2x"
                       alt=""/>
                </div>
                <div class="col_desc">
                  {{$t('use_case_sc_content')}}
                </div>
                <div :class="isMobile ? 'col_bottom_container_m' : 'col_bottom_container'">
                  <div class="col_bottom_text center-vertical">{{$t('use_case_sc_keys')}}</div>
                  <div class="col_bottom_more center-vertical" href="">{{$t('use_case_more')}}&gt;</div>
                </div>
              </div>
            </a>
          </div>
        </div>

        <div class="col-md-6">
          <div :class="isMobile ? 'cell_m' : (isZh ? 'cell_zh' : 'cell_en')">
            <a class="a_block" href="http://www.tokenmania.com/" target="_blank">
              <div>
                <div :class="isMobile ? 'col_title_container_m' : 'col_title_container'">
                  <span class="col_title center-vertical">TokenMania</span>
                  <img :class="isMobile ? 'col_title_icon_m' : 'col_title_icon'"
                       src="/nr/static/images/use_case_tm.png"
                       srcset="/nr/static/images/use_case_tm@2x.png 2x"
                       alt=""/>
                </div>
                <div class="col_desc">
                  {{$t('use_case_tm_content')}}
                </div>
                <div :class="isMobile ? 'col_bottom_container_m' : 'col_bottom_container'">
                  <div class="col_bottom_text center-vertical">{{$t('use_case_tm_keys')}}</div>
                  <div class="col_bottom_more center-vertical" href="">{{$t('use_case_more')}}&gt;</div>
                </div>
              </div>
            </a>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>

import $ from 'jquery'

export default {
  name: 'UseCase',
  data () {
    return {
      isMobile: false,
      isZh: false
    }
  },
  methods: {
    updateRtHref: function () {
      let url = this.$appConfig.language === 'cn' ? 'https://www.ratingtoken.io/?hl=zh' : 'https://www.ratingtoken.io/?hl=en'
      $('#a_rt').attr('href', url)
    },
    updateIsMobile: function () {
      this.isMobile = $('#content_container').width() <= 768
    },
    updateColClass: function () {
      this.isZh = this.$appConfig.language === 'cn'
    }
  },
  mounted () {
    this.updateRtHref()
    this.updateIsMobile()
    this.updateColClass()
    let self = this
    this.$event.$on('windowSizeChanged', function () {
      self.updateIsMobile()
      self.updateColClass()
    })
    this.$event.$on('languageChanged', function () {
      self.updateRtHref()
      self.updateColClass()
    })
  }
}
</script>

<style scoped>
  #container {
    padding-bottom: 80px;
  }

  #container a:hover {
    text-decoration: none;
  }

  #title {
    font-size: 36px;
    font-weight: bold;
    margin-top: 80px;
  }

  .a_block {
    width: 100%;
    color: black;
    text-decoration: none;
  }

  .a_block:hover {
    width: 100%;
    /*height: 288px;*/
    color: black;
    text-decoration: none;
  }

  .cell_m {
    width: 100%;
    margin-top: 30px;
    background: white;
    border: 1px solid #F7F8FA;
    border-radius: 4px;

    box-shadow: inset 0 0 0 #000000, 0 10px 30px #F7F8FA;
    -moz-box-shadow: inset 0 0 0 #000000, 0 10px 30px #F7F8FA;
    -webkit-box-shadow: inset 0 0 0 #000000, 0 10px 30px #F7F8FA;

    border-collapse: separate !important;
    padding-left: 55px;
    padding-right: 55px;
    background: white;
    position: relative;

    height: auto;
    padding-bottom: 35px;
  }

  .cell_zh {
    width: 100%;
    margin-top: 30px;
    background: white;
    border: 1px solid #F7F8FA;
    border-radius: 4px;

    box-shadow: inset 0 0 0 #000000, 0 10px 30px #F7F8FA;
    -moz-box-shadow: inset 0 0 0 #000000, 0 10px 30px #F7F8FA;
    -webkit-box-shadow: inset 0 0 0 #000000, 0 10px 30px #F7F8FA;

    border-collapse: separate !important;
    padding-left: 55px;
    padding-right: 55px;
    background: white;
    position: relative;

    height: 300px;
  }

  .cell_en {
    width: 100%;
    margin-top: 30px;
    background: white;
    border: 1px solid #F7F8FA;
    border-radius: 4px;

    box-shadow: inset 0 0 0 #000000, 0 10px 30px #F7F8FA;
    -moz-box-shadow: inset 0 0 0 #000000, 0 10px 30px #F7F8FA;
    -webkit-box-shadow: inset 0 0 0 #000000, 0 10px 30px #F7F8FA;

    border-collapse: separate !important;
    padding-left: 55px;
    padding-right: 55px;
    background: white;
    position: relative;

    height: 330px;
  }

  .col_title_container {
    position: relative;
    height: 60px;
    margin-top: 40px;
  }

  .col_title_container_m {
    position: relative;
    margin-top: 40px;
  }

  .col_title {
    font-size: 30px;
    font-weight: bold;
    float: left;
  }

  .col_title_icon {
    position: absolute;
    right: 0;
    top: 0;
    width: 160px;
    height: 60px;
  }

  .col_title_icon_m {
    display: inline-block;
    float: left;
    width: 160px;
    height: 60px;
  }

  .col_desc {
    font-size: 15px;
    margin-top: 36px;
    text-align: left;
    clear: both;
  }

  .col_bottom_container_m {
    height: 30px;
    margin-top: 35px;
  }

  .col_bottom_container {
    height: 30px;
    position: absolute;
    left: 55px;
    right: 55px;
    bottom: 35px;
  }

  .col_bottom_text {
    height: 20px;
    float: left;
    font-size: 15px;
    font-weight: bold;
  }

  .a_block:hover .col_bottom_more {
    height: 20px;
    float: right;
    font-size: 14px;
    color: #4560E6;
    visibility: visible;
  }

  .col_bottom_more {
    visibility: hidden;
  }
</style>
