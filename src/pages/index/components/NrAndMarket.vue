<template>
  <div id="container">
    <div id="title0">{{$t('ranking_title')}}</div>
    <div id="title1">{{$t('ranking_title1')}}</div>
    <div id="btn_container">
      <button type="button" class="btn_item" @click="changeView('nebulas')"
              :class="platform == 'nebulas' ? 'nr_btn_item_active' : 'nr_btn_item'">
        Nebulas
      </button><button type="button" class="btn_item" @click="changeView('eth')"
              :class="platform == 'eth' ? 'nr_btn_item_active' : 'nr_btn_item'">
        Ethereum
      </button>
    </div>
    <img id="img" :class="isMobile ? 'nr_image_m' : 'nr_image'"/>
    <div id="desc">{{$t('mr_desc')}}</div>
  </div>
</template>

<script>

import {Platform} from '../../../common/api'
import '../../../common/util'
import '../../../assets/css/common.css'
import $ from 'jquery'

export default {
  name: 'NrAndMarket',
  data () {
    return {
      platform: Platform.Neb,
      result: '',
      nrImages: {
        eth: ['/nr/static/images/eth-nr-en@2x.jpg', '/nr/static/images/eth-nr-zh@2x.jpg'],
        nas: ['/nr/static/images/nas-nr-en@2x.jpg', '/nr/static/images/nas-nr-zh@2x.jpg']
      },
      isMobile: false
    }
  },
  methods: {
    changeView: function (platform) {
      this.platform = platform
      this.updateImages()
    },
    updateImages: function () {
      let imgs = this.platform === Platform.Neb ? this.nrImages.nas : this.nrImages.eth
      $('#img').attr('src', this.$appConfig.language === 'cn' ? imgs[1] : imgs[0])
    },
    updateIsMobile: function () {
      this.isMobile = $('#container').width() <= 768
    }
  },
  mounted: function () {
    this.updateImages()
    this.updateIsMobile()
    let self = this
    this.$event.$on('windowSizeChanged', function () {
      self.updateIsMobile()
    })
    this.$event.$on('languageChanged', function () {
      self.updateImages()
    })
  }
}
</script>

<style scoped>

  #container {
    background: white;
    padding-top: 80px;
    padding-bottom: 80px;
  }

  #title0 {
    font-size: 36px;
    font-weight: bold;
  }

  #title1 {
    font-size: 20px;
    margin-top: 10px;
  }

  #btn_container {
    margin-top: 60px;
  }

  .btn_item {
    width: 130px;
  }

  .nr_image {
    width: 680px;
    height: 320px;
    margin-top: 50px;
  }

  .nr_image_m {
    width: 340px;
    height: 160px;
    margin-top: 50px;
  }

  #desc {
    color: #999;
    font-size: 12px;
    margin-top: 20px;
  }

</style>
