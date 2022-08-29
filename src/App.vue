<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/blog">Blog</router-link> |
     <router-link to="/favorite">Favorite Posts</router-link>
  </nav>

  <div class="content-box"><router-view/></div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.content-box {
  width: 800px;
  margin: 0 auto;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
     color: #4eb2d7;
}
</style>
