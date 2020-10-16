<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  mounted () {
    // window.onbeforeunload = function () {
    //   window.localStorage.clear()
    //   localStorage.removeItem('reccode')
    //   return ''
    // }
  }
}
</script>
<style>
  /* .AddColor {
    background-color: rgba(1, 1, 1, 0.75);
  } */
  @import 'assets/css/maicons.css';
  @import 'assets/vendor/animate/animate.css';
  @import 'assets/vendor/owl-carousel/css/owl.carousel.min.css';
  /* @import 'assets/css/bootstrap.css'; */
  @import 'assets/css/mobster.css';
</style>
