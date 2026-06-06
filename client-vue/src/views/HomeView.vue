<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { usePokemonStore } from "@/stores/pokemonStore";

import PokemonCard from "@/components/PokemonCard.vue";
import Pagination from "@/components/Pagination.vue";
import SearchBar from "@/components/SearchBar.vue";
import PokemonFilters from "@/components/PokemonFilters.vue";
import PokemonSort from "@/components/PokemonSort.vue";

const pokemonStore = usePokemonStore();

const currentPage = ref(1);
const pokemonsPerPage = 12;

const searchTerm = ref("");
const selectedType = ref("all");
const selectedOrigin = ref("all");
const selectedOrder = ref("default");

onMounted(() => {
  pokemonStore.getPokemons();
});

const availableTypes = computed(() => {
  const allTypes = pokemonStore.pokemons.flatMap((pokemon) => pokemon.types);

  return [...new Set(allTypes)].sort();
});

const filteredPokemons = computed(() => {
  const normalizedSearch = searchTerm.value.trim().toLowerCase();

  return pokemonStore.pokemons.filter((pokemon) => {
    const matchesSearch = pokemon.name.toLowerCase().includes(normalizedSearch);

    const matchesType =
      selectedType.value === "all" ||
      pokemon.types.includes(selectedType.value);

    const matchesOrigin =
      selectedOrigin.value === "all" ||
      (selectedOrigin.value === "db" && pokemon.createDb) ||
      (selectedOrigin.value === "api" && !pokemon.createDb);

    return matchesSearch && matchesType && matchesOrigin;
  });
});

const sortedPokemons = computed(() => {
  const pokemonsCopy = [...filteredPokemons.value];

  if (selectedOrder.value === "name-asc") {
    return pokemonsCopy.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (selectedOrder.value === "name-desc") {
    return pokemonsCopy.sort((a, b) => b.name.localeCompare(a.name));
  }

  if (selectedOrder.value === "attack-desc") {
    return pokemonsCopy.sort((a, b) => Number(b.attack) - Number(a.attack));
  }

  if (selectedOrder.value === "attack-asc") {
    return pokemonsCopy.sort((a, b) => Number(a.attack) - Number(b.attack));
  }

  return pokemonsCopy;
});

const totalPages = computed(() => {
  return Math.ceil(filteredPokemons.value.length / pokemonsPerPage);
});

const currentPokemons = computed(() => {
  const firstIndex = (currentPage.value - 1) * pokemonsPerPage;
  const lastIndex = firstIndex + pokemonsPerPage;

  return sortedPokemons.value.slice(firstIndex, lastIndex);
});

const changePage = (pageNumber) => {
  currentPage.value = pageNumber;
};

watch([searchTerm, selectedType, selectedOrigin, selectedOrder], () => {
  currentPage.value = 1;
});

const deletePokemon = async (id) => {
  const confirmed = window.confirm("¿Querés eliminar este Pokémon?");

  if (!confirmed) {
    return;
  }

  await pokemonStore.deletePokemon(id);
};
</script>

<template>
  <main class="home-page">
    <section class="home-container">
      <header class="hero">
        <div>
          <p class="eyebrow">Explorar Pokédex</p>

          <h1>Pokémons</h1>

          <p class="hero-description">
            Buscá, filtrá y compará Pokémon de la API y de tu propia colección.
          </p>
        </div>

        <div class="total-card">
          <span>Pokémons cargados</span>
          <strong>{{ pokemonStore.pokemons.length }}</strong>
        </div>
      </header>

      <p v-if="pokemonStore.isLoadingPokemons" class="status-message">
        Cargando Pokémon...
      </p>

      <p v-else-if="pokemonStore.pokemonsError" class="error-message">
        {{ pokemonStore.pokemonsError }}
      </p>

      <section v-else>
        <section class="controls-panel">
          <div class="controls-row">
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

            <PokemonSort
              :selected-order="selectedOrder"
              @update:selected-order="selectedOrder = $event"
            />
          </div>
        </section>

        <div class="results-header">
          <p>
            Coincidencias encontradas:
            <strong>{{ filteredPokemons.length }}</strong>
          </p>

          <span> Página {{ currentPage }} de {{ totalPages || 1 }} </span>
        </div>

        <section class="cards-container">
          <PokemonCard
            v-for="pokemon in currentPokemons"
            :key="pokemon.id"
            :pokemon="pokemon"
            @delete-pokemon="deletePokemon"
          />
        </section>

        <p v-if="filteredPokemons.length === 0" class="empty-message">
          No se encontraron Pokémon con esos criterios.
        </p>

        <Pagination
          v-if="totalPages > 1"
          :total-pages="totalPages"
          :current-page="currentPage"
          @change-page="changePage"
        />
      </section>
    </section>
  </main>
</template>

<style scoped>
.home-page {
  min-height: calc(100vh - 68px);
  padding: 30px 0 42px;
}

.home-container {
  width: min(1340px, calc(100% - 32px));
  margin: 0 auto;
}

.hero {
  width: min(1120px, 100%);
  margin: 0 auto 20px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
}

.eyebrow {
  margin: 0 0 6px;
  color: #facc15;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

h1 {
  max-width: 620px;
  margin: 0;
  color: #f8fafc;
  font-size: clamp(30px, 4vw, 44px);
  line-height: 1.02;
}

.hero-description {
  max-width: 620px;
  margin: 10px 0 0;
  color: #a7b4cc;
  font-size: 14px;
  line-height: 1.5;
}

.total-card {
  min-width: 155px;
  padding: 13px 16px;
  border: 1px solid rgba(250, 204, 21, 0.28);
  border-radius: 15px;
  background: rgba(250, 204, 21, 0.08);
}

.total-card span {
  display: block;
  color: #cbd5e1;
  font-size: 11px;
  font-weight: 700;
}

.total-card strong {
  display: block;
  margin-top: 3px;
  color: #facc15;
  font-size: 30px;
}

.controls-panel {
  width: min(1120px, 100%);
  margin: 0 auto;
  padding: 16px 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  background: rgba(16, 28, 48, 0.76);
  box-shadow: 0 12px 24px rgba(2, 8, 23, 0.16);
}
.controls-row {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
}

.controls-row {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
}

.results-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin: 17px auto 12px;
  color: #a7b4cc;
  font-size: 13px;
}

.results-header p {
  margin: 0;
}

.results-header strong {
  color: #f8fafc;
}

.results-header span {
  color: #94a3b8;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 14px;
}

.status-message,
.empty-message,
.error-message {
  padding: 16px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.06);
}

.error-message {
  color: #fca5a5;
}

.empty-message {
  color: #cbd5e1;
}

@media (max-width: 1180px) {
  .cards-container {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}

@media (max-width: 980px) {
  .cards-container {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .home-page {
    padding-top: 24px;
  }

  .home-container {
    width: min(100% - 22px, 1340px);
  }

  .hero {
    display: block;
  }

  .hero-description {
    font-size: 13px;
  }

  .total-card {
    width: 100%;
    margin-top: 15px;
  }

  .results-header {
    display: block;
  }

  .results-header span {
    display: block;
    margin-top: 5px;
  }

  .cards-container {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 11px;
  }
}

@media (max-width: 560px) {
  .cards-container {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 360px) {
  .cards-container {
    grid-template-columns: 1fr;
  }
}
</style>
