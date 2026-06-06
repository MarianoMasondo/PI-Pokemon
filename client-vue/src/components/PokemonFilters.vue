<script setup>
defineProps({
  selectedType: {
    type: String,
    required: true,
  },

  selectedOrigin: {
    type: String,
    required: true,
  },

  availableTypes: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:selected-type", "update:selected-origin"]);

const handleTypeChange = (event) => {
  emit("update:selected-type", event.target.value);
};

const handleOriginChange = (event) => {
  emit("update:selected-origin", event.target.value);
};
</script>

<template>
  <section class="filters">
    <label>
      Tipo:

      <select :value="selectedType" @change="handleTypeChange">
        <option value="all">Todos</option>

        <option v-for="type in availableTypes" :key="type" :value="type">
          {{ type }}
        </option>
      </select>
    </label>

    <label>
      Origen:

      <select :value="selectedOrigin" @change="handleOriginChange">
        <option value="all">Todos</option>

        <option value="api">API</option>

        <option value="db">Base de datos</option>
      </select>
    </label>
  </section>
</template>

<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 0;
}

label {
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: #cbd5e1;
  font-size: 13px;
}

select {
  min-width: 170px;
  padding: 9px 10px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  background: #f8fafc;
  color: #111827;
  font-size: 14px;
  text-transform: capitalize;
  outline: none;
}

select:focus {
  border-color: #facc15;
}
</style>
