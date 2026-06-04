<script setup></script>

<template>
  <header class="navbar">
    <RouterLink to="/home">
      Home
    </RouterLink>

    <RouterLink to="/">
      Landing
    </RouterLink>

    <RouterLink to="/create">
  Crear Pokémon
</RouterLink>
  </header>
</template>

<style scoped>
.navbar {
  display: flex;
  gap: 16px;
  padding: 16px 24px;
  background-color: #333333;
}

a {
  color: white;
  text-decoration: none;
}

.router-link-active {
  font-weight: bold;
  text-decoration: underline;
}
</style>