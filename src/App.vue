<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Timer</router-link> |
      <router-link to="/history">History</router-link>|
      <router-link to="/trainer">Trainer</router-link>
    </div>
    <div class="container">
    </div>
      <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bungee+Shade&family=Love+Ya+Like+A+Sister&family=Rubik+Vinyl&family=VT323&display=swap');
:root{
  --primary-color: rgba(238, 238, 238, 0.929);
  --secondary-color: rgba(0, 0, 0, 0.144);
  --primary-font: 'Love Ya Like A Sister', cursive;
  --secondary-font: Avenir, Helvetica, Arial, sans-serif;
  --nav-font: 'Rubik Vinyl', cursive;
  --h1-font: 'Bungee Shade', cursive;
  --timer-font: 'VT323', monospace;
  --button-font: 'Love Ya Like A Sister', cursive;
}

html{
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
  text-align: center;
  font-size: 1.2em;
  background-image: url("./assets/lego.jpg");
  background-size: 60%; 
}

ul{
  list-style: none;
  padding: 0;
  margin: 0;
}

h1{
  font-size: 50px;
  font-family: var(--h1-font);
}

select{
  font-size: 15px;
  padding: 5px;
}

#app {
  font-family: var(--primary-font);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 5px;
}

@media(max-width: 1000px){
  #nav {
    justify-content: center;
  }
}

#nav a {
  font-family: var(--nav-font);
  font-weight: bold;
  color: #2c3e50;
  background-color: rgba(238, 238, 238, 0.929);
  padding: 10px;
  border-radius: 10px;
}

#nav a.router-link-exact-active {
  /* color: #42b983; */
  color: #eee;
  background-color: rgba(0, 0, 0, 0.519)
}
</style>
