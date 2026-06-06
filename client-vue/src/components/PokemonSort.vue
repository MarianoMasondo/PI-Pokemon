<script setup>
defineProps({
  selectedOrder: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:selected-order"]);

const handleOrderChange = (event) => {
  emit("update:selected-order", event.target.value);
};
</script>

<template>
  <label class="sort-control">
    Ordenar por:

    <select :value="selectedOrder" @change="handleOrderChange">
      <option value="default">Sin ordenar</option>

      <option value="name-asc">Nombre: A → Z</option>

      <option value="name-desc">Nombre: Z → A</option>

      <option value="attack-desc">Ataque: mayor a menor</option>

      <option value="attack-asc">Ataque: menor a mayor</option>
    </select>
  </label>
</template>

<style scoped>
.sort-control {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 210px;
  margin: 0;
  color: #cbd5e1;
  font-size: 13px;
}

select {
  padding: 9px 10px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  background: #f8fafc;
  color: #111827;
  font-size: 14px;
  outline: none;
}

select:focus {
  border-color: #facc15;
}
</style>
