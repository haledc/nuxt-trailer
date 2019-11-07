<template>
  <div class="player">
    <div
      v-video-player:VueVideoPlayer="{
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{ type: 'video/mp4', src: movieDetail.url }],
        poster: movieDetail.pic,
        height: '800',
        width: '1400'
      }"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    movieDetail: { type: Object, default: () => {} }
  }
}
</script>

<style lang="scss" scoped>
.player {
  max-width: 1400px;
  max-height: 800px;
}
</style>
