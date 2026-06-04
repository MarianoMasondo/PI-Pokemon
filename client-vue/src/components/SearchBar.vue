<script setup>
defineProps({
  searchTerm: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:search-term'])

const handleInput = (event) => {
  emit('update:search-term', event.target.value)
}
</script>

<template>
  <div class="search-bar">
    <input
      type="text"
      :value="searchTerm"
      placeholder="Buscar Pokémon..."
      @input="handleInput"
    />
  </div>
</template>

<style scoped>
.search-bar {
  margin-bottom: 20px;
}

input {
  width: 280px;
  padding: 10px 12px;
  border: 1px solid #cccccc;
  border-radius: 8px;
  font-size: 16px;
}
</style>