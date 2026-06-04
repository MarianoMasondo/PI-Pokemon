<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import NavBar from '@/components/NavBar.vue'

const route = useRoute()

const showNavBar = computed(() => {
  return route.path !== '/'
})
</script>

<template>
  <div class="app-container">
    <NavBar v-if="showNavBar" />

    <RouterView />
  </div>
</template>

<style scoped></style>