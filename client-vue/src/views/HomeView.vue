<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { usePokemonStore } from '@/stores/pokemonStore'

import PokemonCard from '@/components/PokemonCard.vue'
import Pagination from '@/components/Pagination.vue'
import SearchBar from '@/components/SearchBar.vue'
import PokemonFilters from '@/components/PokemonFilters.vue'

const pokemonStore = usePokemonStore()

const currentPage = ref(1)
const pokemonsPerPage = 12

const searchTerm = ref('')
const selectedType = ref('all')
const selectedOrigin = ref('all')

onMounted(() => {
  pokemonStore.getPokemons()
})

const availableTypes = computed(() => {
  const allTypes = pokemonStore.pokemons.flatMap(
    (pokemon) => pokemon.types
  )

  return [...new Set(allTypes)].sort()
})

const filteredPokemons = computed(() => {
  const normalizedSearch = searchTerm.value
    .trim()
    .toLowerCase()

  return pokemonStore.pokemons.filter((pokemon) => {
    const matchesSearch = pokemon.name
      .toLowerCase()
      .includes(normalizedSearch)

    const matchesType =
      selectedType.value === 'all' ||
      pokemon.types.includes(selectedType.value)

    const matchesOrigin =
      selectedOrigin.value === 'all' ||
      (selectedOrigin.value === 'db' && pokemon.createDb) ||
      (selectedOrigin.value === 'api' && !pokemon.createDb)

    return matchesSearch && matchesType && matchesOrigin
  })
})

const totalPages = computed(() => {
  return Math.ceil(
    filteredPokemons.value.length / pokemonsPerPage
  )
})

const currentPokemons = computed(() => {
  const firstIndex = (currentPage.value - 1) * pokemonsPerPage
  const lastIndex = firstIndex + pokemonsPerPage

  return filteredPokemons.value.slice(firstIndex, lastIndex)
})

const changePage = (pageNumber) => {
  currentPage.value = pageNumber
}

watch(
  [searchTerm, selectedType, selectedOrigin],
  () => {
    currentPage.value = 1
  }
)
</script>

<template>
  <main>
    <h1>Pokémon con Vue</h1>

    <p>
      Cantidad total recibida:
      {{ pokemonStore.pokemons.length }}
    </p>

    <SearchBar
      :search-term="searchTerm"
      @update:search-term="searchTerm = $event"
    />

    <PokemonFilters
      :selected-type="selectedType"
      :selected-origin="selectedOrigin"
      :available-types="availableTypes"
      @update:selected-type="selectedType = $event"
      @update:selected-origin="selectedOrigin = $event"
    />

    <p>
      Coincidencias encontradas:
      {{ filteredPokemons.length }}
    </p>

    <section class="cards-container">
      <PokemonCard
        v-for="pokemon in currentPokemons"
        :key="pokemon.id"
        :pokemon="pokemon"
      />
    </section>

    <p v-if="filteredPokemons.length === 0">
      No se encontraron Pokémon.
    </p>

    <Pagination
      v-if="totalPages > 1"
      :total-pages="totalPages"
      :current-page="currentPage"
      @change-page="changePage"
    />
  </main>
</template>

<style scoped>
main {
  padding: 24px;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>