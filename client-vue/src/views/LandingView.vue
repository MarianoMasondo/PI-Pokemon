<script setup></script>

<template>
  <main class="landing-page">
    <section class="landing-content">
      <h1>Pokémon App</h1>

      <p>
        Explorá Pokémon, filtrá resultados y consultá sus estadísticas.
      </p>

      <RouterLink class="enter-button" to="/home">
        Ingresar
      </RouterLink>
    </section>
  </main>
</template>

<style scoped>
.landing-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f4f4;
}

.landing-content {
  padding: 32px;
  border: 1px solid #cccccc;
  border-radius: 16px;
  background-color: white;
  text-align: center;
}

.enter-button {
  display: inline-block;
  margin-top: 16px;
  padding: 10px 18px;
  border-radius: 8px;
  background-color: #333333;
  color: white;
  text-decoration: none;
}
</style>