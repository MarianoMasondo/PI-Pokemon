<script setup>
defineProps({
  searchTerm: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:search-term"]);

const handleInput = (event) => {
  emit("update:search-term", event.target.value);
};
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
  display: flex;
  justify-content: center;
  margin-bottom: 14px;
}

input {
  width: min(100%, 520px);
  padding: 10px 12px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 9px;
  background: #f8fafc;
  color: #111827;
  font-size: 14px;
  outline: none;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease;
}

input:focus {
  border-color: #facc15;
  box-shadow: 0 0 0 3px rgba(250, 204, 21, 0.14);
}
</style>
