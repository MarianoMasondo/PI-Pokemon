<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { usePokemonStore } from "@/stores/pokemonStore";

const route = useRoute();
const pokemonStore = usePokemonStore();

onMounted(() => {
  pokemonStore.getPokemonDetail(route.params.id);
});
</script>

<template>
  <main class="detail-page">
    <p v-if="!pokemonStore.pokemonDetail">Cargando Pokémon...</p>

    <article v-else class="detail-card">
      <img
        class="detail-image"
        :src="pokemonStore.pokemonDetail.image"
        :alt="pokemonStore.pokemonDetail.name"
      />

      <h1>{{ pokemonStore.pokemonDetail.name }}</h1>

      <p>
        <strong>ID:</strong>
        {{ pokemonStore.pokemonDetail.id }}
      </p>

      <p>
        <strong>Tipos:</strong>
        {{ pokemonStore.pokemonDetail.type.join(", ") }}
      </p>

      <p>
        <strong>Vida:</strong>
        {{ pokemonStore.pokemonDetail.hp }}
      </p>

      <p>
        <strong>Ataque:</strong>
        {{ pokemonStore.pokemonDetail.attack }}
      </p>

      <p>
        <strong>Defensa:</strong>
        {{ pokemonStore.pokemonDetail.defense }}
      </p>

      <p>
        <strong>Velocidad:</strong>
        {{ pokemonStore.pokemonDetail.speed }}
      </p>

      <p>
        <strong>Altura:</strong>
        {{ pokemonStore.pokemonDetail.height }}
      </p>

      <p>
        <strong>Peso:</strong>
        {{ pokemonStore.pokemonDetail.weight }}
      </p>

      <RouterLink to="/home"> Volver a Home </RouterLink>
    </article>
  </main>
</template>

<style scoped>
.detail-page {
  padding: 24px;
}

.detail-card {
  max-width: 420px;
  padding: 24px;
  border: 1px solid #cccccc;
  border-radius: 12px;
  background-color: white;
  text-align: center;
}

.detail-image {
  width: 220px;
  height: 220px;
  object-fit: contain;
}

h1 {
  text-transform: capitalize;
}
</style>
