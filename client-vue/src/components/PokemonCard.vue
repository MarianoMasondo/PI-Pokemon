<script setup>
const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['delete-pokemon'])

const handleDelete = () => {
  emit('delete-pokemon', props.pokemon.id)
}
</script>

<template>
  <article class="pokemon-card">
    <img class="pokemon-image" :src="pokemon.image" :alt="pokemon.name" />

    <h2>{{ pokemon.name }}</h2>

    <p>
      <strong>Tipos:</strong>
      {{ pokemon.types.join(", ") }}
    </p>

    <p>
      <strong>Ataque:</strong>
      {{ pokemon.attack }}
    </p>

    <RouterLink :to="`/detail/${pokemon.id}`"> Ver detalle </RouterLink>

    <button
  v-if="pokemon.createDb"
  class="delete-button"
  type="button"
  @click="handleDelete"
>
  Eliminar
</button>
  </article>
</template>

<style scoped>
.pokemon-card {
  width: 220px;
  padding: 16px;
  border: 1px solid #cccccc;
  border-radius: 12px;
  background-color: white;
  text-align: center;
}

.pokemon-image {
  width: 140px;
  height: 140px;
  object-fit: contain;
}

h2 {
  text-transform: capitalize;
}

.delete-button {
  margin-top: 12px;
  padding: 8px 12px;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
}
</style>
