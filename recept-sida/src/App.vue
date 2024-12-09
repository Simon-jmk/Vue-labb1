<template>
  <div id="app">
    <header>
      <h1>Recipe Finder</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/favorites">Favorites</router-link>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<script lang="ts">
export default {
  name: 'App',
}
</script>

<style>
header {
  background-color: #42b983;
  color: white;
  text-align: center;
  padding: 1rem 0;
}
body {
  font-family: Arial, sans-serif;
  margin: 0;
}
nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
</style>
