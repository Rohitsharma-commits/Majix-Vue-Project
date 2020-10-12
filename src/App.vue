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
  .AddColor {
    background-color: rgba(1, 1, 1, 0.75);
  }
</style>
