<template>
  <div id="container">
    <div id="line"></div>
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <a href="https://nebulas.io" target="_blank">
            <img id="logo" :class="isMobile ? 'logo_m' : 'logo'" src="/nr/static/images/footer_logo.png" srcset="/nr/static/images/footer_logo@2x.png 2x" alt="">
          </a>
        </div>
        <div class="col-md-4">
          <div id="copyright">
            Copyright &#169; 2017-2018 Nebulas.io
          </div>
        </div>
        <div class="col-md-4">
          <div id="right_container" :class="isMobile ? 'right_container_m' : 'right_container'">
            <a id="github" class="link" href="https://github.com/nebulasio/nebnr/issues" target="_blank">
              <div style="width: 24px; height: 100%; float:left">
                <button class="icon icon_github"></button>
              </div>
              &nbsp;Submit an issue
            </a>
            <a id="twiter" class="link" href="https://twitter.com/nebulasio" target="_blank">
              <div style="width: 24px; height: 100%; float:left">
                <button class="icon icon_twiter"></button>
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
  name: 'NrFooter',
  data () {
    return {
      isMobile: false
    }
  },
  methods: {
    updateIsMobile: function () {
      this.isMobile = $('#container').width() <= 768
    }
  },
  mounted () {
    this.updateIsMobile()
    let self = this
    this.$event.$on('windowSizeChanged', function () {
      self.updateIsMobile()
    })
  }
}

</script>

<style scoped>
  #container {
    background: white;
  }

  #line {
    width: 100%;
    height: 1px;
    background: #F8F8F8;
    z-index: 100;
  }

  .logo {
    width: 156px;
    height: 34px;
    margin-top: 24px;
    float: left;
  }

  .logo_m {
    width: 156px;
    height: 34px;
    margin-top: 24px;
  }

  #copyright {
    font-size: 16px;
    line-height: 82px;
    text-align: center;
    z-index: 0;
  }

  .right_container {
    height: 100%;
    float: right;
  }

  .right_container_m {
    height: 100%;
  }

  .link {
    height: 82px;
    font-size: 14px;
    color: black;
    float: right;
    line-height: 82px;
    margin-left: 20px;
  }

  .link:hover {
    height: 82px;
    font-size: 14px;
    color: #4560E6;
    float: right;
    line-height: 82px;
    margin-left: 20px;
  }

  .icon {
    width: 24px;
    height: 24px;
    margin-top: 27px;
    -webkit-background-size: 24px, 24px;
    background-size: 24px, 24px;
    border-width: 0;
    background-color: transparent;
    padding: 0;
  }

  .icon_twiter {
    background-image: url('/nr/static/images/twitter.png');
  }

  a:hover .icon_twiter {
    background-image: url('/nr/static/images/twitter_hover.png');
  }

  .icon_github {
    background-image: url('/nr/static/images/github.png');
  }

  a:hover .icon_github {
    background-image: url('/nr/static/images/github_hover.png');
  }

  @media only screen and (-webkit-min-device-pixel-ratio:2) {
    .icon_twiter {
      background-image: url('/nr/static/images/twitter@2x.png');
    }

    a:hover .icon_twiter {
      background-image: url('/nr/static/images/twitter_hover@2x.png');
    }

    .icon_github {
      background-image: url('/nr/static/images/github@2x.png');
    }

    a:hover .icon_github {
      background-image: url('/nr/static/images/github_hover@2x.png');
    }
  }

</style>
