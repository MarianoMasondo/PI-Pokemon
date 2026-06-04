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
})

const emit = defineEmits([
  'update:selected-type',
  'update:selected-origin',
])

const handleTypeChange = (event) => {
  emit('update:selected-type', event.target.value)
}

const handleOriginChange = (event) => {
  emit('update:selected-origin', event.target.value)
}
</script>

<template>
  <section class="filters">
    <label>
      Tipo:

      <select
        :value="selectedType"
        @change="handleTypeChange"
      >
        <option value="all">
          Todos
        </option>

        <option
          v-for="type in availableTypes"
          :key="type"
          :value="type"
        >
          {{ type }}
        </option>
      </select>
    </label>

    <label>
      Origen:

      <select
        :value="selectedOrigin"
        @change="handleOriginChange"
      >
        <option value="all">
          Todos
        </option>

        <option value="api">
          API
        </option>

        <option value="db">
          Base de datos
        </option>
      </select>
    </label>
  </section>
</template>

<style scoped>
.filters {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

select {
  min-width: 180px;
  padding: 8px;
  border: 1px solid #cccccc;
  border-radius: 8px;
  text-transform: capitalize;
}
</style>