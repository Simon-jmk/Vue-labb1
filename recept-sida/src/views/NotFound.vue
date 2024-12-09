<template>
  <div class="not-found">
    <h2>404 - Page Not Found</h2>
    <p>The page you are looking for does not exist.</p>
    <router-link to="/">Go back to Home</router-link>
  </div>
</template>

<script lang="ts">
export default {
  name: 'NotFound',
};
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 2rem;
}
</style>
