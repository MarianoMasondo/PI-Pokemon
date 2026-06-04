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
})

const emit = defineEmits(['change-page'])

const changePage = (pageNumber) => {
  emit('change-page', pageNumber)
}
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
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 24px;
}

button {
  padding: 8px 12px;
  border: 1px solid #cccccc;
  border-radius: 6px;
  cursor: pointer;
}

button.active {
  font-weight: bold;
  border: 2px solid #333333;
}
</style>