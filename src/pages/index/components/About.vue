<template>
  <div id="container">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <div class="a_cell">
            <img src="/nr/static/images/about_use.png"
                 srcset="/nr/static/images/about_use@2x.png 2x" class="a_img"/>
            <div class="a_title">{{$t('about_use')}}</div>
            <a class="col_btn_container center-block"
               href="https://github.com/nebulasio/nebnr" target="_blank" @click="downloadClick">
              <div class="col_btn">{{$t('about_download_sdk')}}</div>
            </a>
          </div>
        </div>
        <div class="col-md-4">
          <div class="a_cell">
            <img src="/nr/static/images/about_know.png"
                 srcset="/nr/static/images/about_know@2x.png 2x" class="a_img"/>
            <div class="a_title">{{$t('about_know')}}</div>
            <a id="a_yellow_paper" class="col_btn_container center-block" href="javascript:void(0)" target="_blank">
              <div class="col_btn">{{$t('about_yellow_paper')}}</div>
            </a>
          </div>
        </div>
        <div class="col-md-4">
          <div class="a_cell">
            <img src="/nr/static/images/about_chat.png"
                 srcset="/nr/static/images/about_chat@2x.png 2x" class="a_img"/>
            <div class="a_title">{{$t('about_chat')}}</div>
            <a class="col_btn_container center-block" href="https://lists.nebulas.io/cgi-bin/mailman/listinfo"
               target="_blank">
              <div class="col_btn">{{$t('about_email')}}</div>
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
  name: 'About',
  methods: {
    updateYellowPaperHref: function () {
      let url = this.$appConfig.language === 'cn' ? 'https://nebulas.io/docs/NebulasYellowpaperZh.pdf' : 'https://nebulas.io/docs/NebulasYellowpaper.pdf'
      $('#a_yellow_paper').attr('href', url)
    },
    downloadClick: function () {
      this.$ga.event('NRDemo', 'SDK_Download_Click', '', 1)
    }
  },
  mounted () {
    this.updateYellowPaperHref()
    let self = this
    this.$event.$on('languageChanged', function () {
      self.updateYellowPaperHref()
    })
  }
}
</script>

<style scoped>

  #container {
    padding-top: 80px;
    padding-bottom: 120px;
  }

  #container a {
    text-decoration: none;
  }

  #container a:hover {
    text-decoration: none;
  }

  #container a:hover div {
    background: #000;
    color: white;
  }

  .a_cell {
    height: 340px;
    background: white;

    box-shadow: inset 0 0 0 #000000, 0 10px 30px #F7F8FA;
    -moz-box-shadow: inset 0 0 0 #000000, 0 10px 30px #F7F8FA;
    -webkit-box-shadow: inset 0 0 0 #000000, 0 10px 30px #F7F8FA;

    border-collapse: separate !important;
    border: 1px solid #F7F8FA;
    margin-top: 30px;
  }

  .a_img {
    width: 100px;
    height: 100px;
    margin-top: 40px;
  }

  .a_title {
    font-size: 20px;
    font-weight: bold;
    color: #323232;
    margin-top: 20px;
  }

  .col_btn_container {
    width: 240px;
    height: 40px;
    margin-top: 72px;
  }

  .col_btn {
    width: 100%;
    height: 100%;
    line-height: 40px;
    border: solid 1px black;
    font-size: 15px;
    color: black;
  }

</style>
