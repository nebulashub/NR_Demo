<template>
  <div id="home_container">
    <div id="search_container">
      <nr-header :allow-search="false"></nr-header>
      <search></search>
    </div>
    <nr-and-market></nr-and-market>
    <nova></nova>
    <use-case></use-case>
    <!--<daily-high-score></daily-high-score>-->
    <div style="background: white">
      <About></About>
    </div>
    <nr-footer></nr-footer>

    <!--<div class="center-block" style="width:400px">-->
    <!--<div id="search_container" class="input-group">-->
    <!--<input type="text" class="form-control" placeholder="输入地址" v-model="address">-->
    <!--<span class="input-group-btn">-->
    <!--<button class="btn btn-info btn-search" @click="search">Search</button>-->
    <!--</span>-->
    <!--</div>-->
    <!--</div>-->

  </div>
</template>

<script>

import NrHeader from '../components/NrHeader'
import Search from '../components/Search'
import NrAndMarket from '../components/NrAndMarket'
import Nova from '../components/Nova'
import UseCase from '../components/UseCase'
import DailyHighScore from '../components/DailyHighScore'
import About from '../components/About'
import NrFooter from '../components/NrFooter'

export default {
  name: 'Home',
  components: {About, DailyHighScore, UseCase, Nova, NrAndMarket, NrHeader, NrFooter, Search},
  data () {
    return {}
  },
  methods: {
    search: function () {
      this.$event.$emit('search', this.address)
    }
  },
  mounted () {
    this.$ga.event('NRDemo', 'Home_Show', '', 1)
  }
}

</script>

<style scoped>
  #search_container {
    background-image: url('/nr/static/images/search_bg.png');
    background-size: cover;
    background-repeat: no-repeat;
  }
  @media only screen and (-webkit-min-device-pixel-ratio:2) {
    #search_container {
      background-image: url('/nr/static/images/search_bg@2x.png');
    }
  }
</style>
