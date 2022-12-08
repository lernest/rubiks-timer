<template>
  <div id="app">
    <Timer/>
  </div>
</template>

<script>
import Timer from './components/Timer.vue'

export default {
  name: 'App',
  components: {
    Timer
  }
}
</script>

<style>
html{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

ul{
  list-style: none;
  padding: 0;
  margin: 0;
}

li{
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

button{
  padding: 9px;
  margin: 0px 2px;
  border-radius: 5px;
}
</style>
