<script setup>
defineProps({
  selectedOrder: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:selected-order'])

const handleOrderChange = (event) => {
  emit('update:selected-order', event.target.value)
}
</script>

<template>
  <label class="sort-control">
    Ordenar por:

    <select
      :value="selectedOrder"
      @change="handleOrderChange"
    >
      <option value="default">
        Sin ordenar
      </option>

      <option value="name-asc">
        Nombre: A → Z
      </option>

      <option value="name-desc">
        Nombre: Z → A
      </option>

      <option value="attack-desc">
        Ataque: mayor a menor
      </option>

      <option value="attack-asc">
        Ataque: menor a mayor
      </option>
    </select>
  </label>
</template>

<style scoped>
.sort-control {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 220px;
  margin-bottom: 20px;
}

select {
  padding: 8px;
  border: 1px solid #cccccc;
  border-radius: 8px;
}
</style>