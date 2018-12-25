<template>
  <div class="text-left">
    <div>
      <div class="btn-group">
        <button type="button" class="btn btn-default" @click="changeView('nebulas')"
                :class="{active: platform == 'nebulas'}">
          Nebulas
        </button>
        <button type="button" class="btn btn-default" @click="changeView('eth')" :class="{active: platform == 'eth'}">
          Eth
        </button>
      </div>
      <a class="pull-right" href="javascript:void(0);" @click="more">more</a>
    </div>
    <br/>
    data:
    <div class="data">{{rankingData}}</div>
  </div>
</template>

<script>
import {Platform} from '../../../common/api'
import '../../../common/util'

const DAYS = 7

export default {
  name: 'DailyHighScore',
  data () {
    return {
      platform: Platform.Neb,
      rankingData: ''
    }
  },
  methods: {
    changeView: function (platform) {
      this.platform = platform
      this.loadData()
    },
    loadData: function () {
      let self = this
      this.$api.getDailyHighScore(this.platform, new Date().format('yyyyMMdd'), DAYS, function (r) {
        if (r.success()) {
          self.rankingData = JSON.stringify(r.data)
        } else {
          self.rankingData = 'error:' + r.msg
        }
      })
    },
    more: function () {
      this.$event.$emit('moreRanking')
    }
  },
  mounted: function () {
    this.loadData()
  }
}
</script>

<style scoped>

  .active {
    background-color: #999;
  }

  .data {
    background-color: #eee;
  }
</style>
