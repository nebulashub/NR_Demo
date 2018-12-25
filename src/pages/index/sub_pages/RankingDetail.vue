<template>
  <div id="ranking_detail_container" class="text-left">
    <button class="btn btn_close" @click="close">close</button>
    <h3>RankingDetail</h3>
  </div>
</template>

<script>
export default {
  name: 'RankingDetail',
  methods: {
    close: function () {
      this.$event.$emit('closeRankingDetail')
    }
  }
}
</script>

<style scoped>

  #ranking_detail_container {
    position: relative;
  }

  .btn_close {
    position: absolute;
    right: 0px;
    top: 0px;
  }

</style>
