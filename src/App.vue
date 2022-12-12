<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Timer</router-link> |
      <router-link to="/history">History</router-link> |
      <router-link to="/trainer">Trainer</router-link>
    </div>
    <div class="container">
    </div>
      <router-view/>
  </div>
</template>

<style>
html{
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
  text-align: center;
  font-size: 1.2em;
  background-image: url("./assets/lego.jpg");
  background-size: cover; 
}

ul{
  list-style: none;
  padding: 0;
  margin: 0;
}

select{
  font-size: 15px;
  padding: 5px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  display: flex;
  justify-content: flex-end;
}

@media(max-width: 1000px){
  #nav {
  justify-content: center;
}
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  background-color: rgba(238, 238, 238, 0.929);
  padding: 10px;
  border-radius: 10px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
