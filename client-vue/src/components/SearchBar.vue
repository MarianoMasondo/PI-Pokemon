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
  <label>
    Buscar:
    <div class="search-bar">
      <input
        type="text"
        :value="searchTerm"
        placeholder="Buscar Pokémon..."
        @input="handleInput"
      />
    </div>
  </label>
</template>

<style scoped>
.search-bar {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 0;
}

input {
  width: 300px;
  min-height: 39px;
  padding: 9px 12px;
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

@media (max-width: 700px) {
  .search-bar,
  input {
    width: 100%;
  }
}
</style>
