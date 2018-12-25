<template>
  <div id="container">
    <div id="title">{{$t('nova_title')}}</div>
    <div id="content_container" class="container">
      <div class="row">
        <div class="col-md-4">
          <div class="col">
            <div id="current_value" class="col_title">
              {{$t('nova_nr_title')}}
            </div>
            <div class="col_sub_title">
              {{$t('nova_nr_sub_title')}}
            </div>
            <div class="col_desc">
              {{$t('nova_nr_desc')}}
            </div>
            <div class="line"></div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="col">
            <div id="current_value" class="col_title">
              {{$t('nova_nbre_title')}}
            </div>
            <div class="col_sub_title">
              {{$t('nova_nbre_sub_title')}}
            </div>
            <div class="col_desc">
              {{$t('nova_nbre_desc')}}
            </div>
            <div class="line"></div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="col">
            <div id="current_value" class="col_title">
              {{$t('nova_dip_title')}}
            </div>
            <div class="col_sub_title">
              {{$t('nova_dip_sub_title')}}
            </div>
            <div class="col_desc">
              {{$t('nova_dip_desc')}}
            </div>
            <div class="line"></div>
          </div>
        </div>
      </div>
    </div>
    <a id="a_download" target="_blank" href="https://github.com/nebulasio/nebnr" @click="downloadClick">
      <div class="download center-block">
        {{$t('nova_download')}}
        <button class="img download_img"/>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'Nova',
  methods: {
    downloadClick: function () {
      this.$ga.event('NRDemo', 'SDK_Download_Click', '', 1)
    }
  }
}
</script>

<style scoped>
  #container {
    padding-top: 80px;
    padding-bottom: 60px;
    background: -webkit-linear-gradient(#8A2FE5, #5018AF); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#8A2FE5, #5018AF); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#8A2FE5, #5018AF); /* Firefox 3.6 - 15 */
    background: linear-gradient(#8A2FE5, #5018AF); /* 标准的语法 */
  }

  #title {
    color: white;
    font-size: 36px;
    font-weight: bold;
  }

  #content_container {
    background-color: rgba(255, 255, 255, 0.25);
    margin-top: 60px;
    padding-top: 40px;
    padding-bottom: 70px;
  }

  .line {
    width: 1px;
    height: 38px;
    position: absolute;
    right: 0;
    top: 70px;
    background-color: rgba(240, 244, 245, 0.15);
  }

  .col {
    margin-top: 30px;
  }

  .col_title {
    color: white;
    font-size: 30px;
    font-weight: bold;
  }

  .col_sub_title {
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    margin-top: 8px;
  }

  .col_desc {
    color: white;
    font-size: 16px;
    margin-top: 30px;
  }

  #a_download {
    text-decoration: none;
  }

  .download {
    width: 300px;
    height: 40px;
    line-height: 40px;
    border: solid 1px white;
    font-size: 15px;
    background-color: transparent;
    color: white;
    text-decoration: none;
    margin-top: 60px;
    outline: none;
  }

  .download:hover {
    width: 300px;
    height: 40px;
    line-height: 40px;
    border: solid 1px white;
    font-size: 15px;
    background-color: white;
    color: #7A28D7;
    text-decoration: none;
    margin-top: 60px;
    outline: none;
  }

  .img {
    width: 16px;
    height: 16px;
    -webkit-background-size: 16px, 16px;
    background-size: 16px, 16px;
    background-repeat: no-repeat;
    background-color: transparent;
    padding: 0;
    border-width: 0;
    position: relative;
    top: 3px;
  }

  .download_img {
    background-image: url('/nr/static/images/nova_download.png');
  }

  .download:hover .download_img {
    background-image: url('/nr/static/images/nova_download_hover.png');
  }

  @media only screen and (-webkit-min-device-pixel-ratio: 2) {
    .download_img {
      background-image: url('/nr/static/images/nova_download@2x.png');
    }

    .download:hover .download_img {
      background-image: url('/nr/static/images/nova_download_hover@2x.png');
    }
  }
</style>
