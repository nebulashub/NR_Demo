<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

// import router from './router/index'

export default {
  name: 'App',
  data () {
    return {
    }
  },
  methods: {
    changeLanguage: function (lang) {
      this.$appConfig.language = lang
      this.$i18n.locale = lang
    }
  },
  watch: {
    // 'text': function (ov, nv) {
    // }
  },
  mounted: function () {
    // router.replace('/home')
    let self = this
    window.onresize = function windowResize () {
      self.$event.$emit('windowSizeChanged', null)
    }
  }
}

</script>

<style>

  #app {
    font-family: OpenSans, sans-serif, 'Avenir', Helvetica, Arial;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    background: #F8F8F8;
    color: black;
  }

</style>
