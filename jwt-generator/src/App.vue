<template>
  <img alt="Zendesk logo" src="./assets/images/main/Zendesk_resize.png" width="120px">
  <Toggle />
</template>

<script>
import Toggle from './components/Toggle.vue'

export default {
  name: 'App',
  components: {
    Toggle
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
