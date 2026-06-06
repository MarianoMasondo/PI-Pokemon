<script setup>
defineProps({
  totalPages: {
    type: Number,
    required: true,
  },

  currentPage: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["change-page"]);

const changePage = (pageNumber) => {
  emit("change-page", pageNumber);
};
</script>

<template>
  <nav class="pagination">
    <button
      v-for="pageNumber in totalPages"
      :key="pageNumber"
      :class="{ active: pageNumber === currentPage }"
      @click="changePage(pageNumber)"
    >
      {{ pageNumber }}
    </button>
  </nav>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 22px;
}

button {
  display: grid;
  width: 36px;
  height: 36px;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.08);
  color: #cbd5e1;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  transition:
    transform 160ms ease,
    border-color 160ms ease,
    background-color 160ms ease,
    color 160ms ease;
}

button:hover {
  transform: translateY(-2px);
  border-color: rgba(250, 204, 21, 0.5);
  color: #facc15;
}

button.active {
  border-color: #facc15;
  background: #facc15;
  color: #111827;
}
</style>
