<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePokemonStore } from "@/stores/pokemonStore";

const route = useRoute();
const router = useRouter();
const pokemonStore = usePokemonStore();

const isDeleting = ref(false);
const deleteError = ref("");

const pokemon = computed(() => {
  return pokemonStore.pokemonDetail;
});

onMounted(() => {
  pokemonStore.getPokemonDetail(route.params.id);
});

const deletePokemon = async () => {
  const confirmed = window.confirm(
    "¿Querés eliminar este Pokémon de tu colección?",
  );

  if (!confirmed) {
    return;
  }

  try {
    isDeleting.value = true;
    deleteError.value = "";

    await pokemonStore.deletePokemon(pokemon.value.id);

    router.push("/home");
  } catch (error) {
    deleteError.value =
      error.response?.data?.error || "No se pudo eliminar el Pokémon.";
  } finally {
    isDeleting.value = false;
  }
};
</script>

<template>
  <main class="detail-page">
    <section class="detail-container">
      <p v-if="pokemonStore.isLoadingDetail" class="status-message">
        Cargando Pokémon...
      </p>

      <section v-else-if="pokemonStore.detailError" class="error-card">
        <p class="error-message">
          {{ pokemonStore.detailError }}
        </p>

        <RouterLink class="back-button" to="/home">
          Volver a Inicio
        </RouterLink>
      </section>

      <article v-else-if="pokemon" class="detail-card">
        <section class="visual-panel">
          <div class="visual-top">
            <span class="pokemon-id">
              #{{ String(pokemon.id).slice(0, 8) }}
            </span>

            <span class="origin-badge" :class="{ database: pokemon.createDb }">
              {{ pokemon.createDb ? "Creado" : "API" }}
            </span>
          </div>

          <div class="image-container">
            <div class="image-glow"></div>

            <img
              class="detail-image"
              :src="pokemon.image"
              :alt="pokemon.name"
            />
          </div>

          <p class="visual-caption">Registro Pokédex</p>
        </section>

        <section class="information-panel">
          <header class="detail-header">
            <p class="eyebrow">Ficha de Pokémon</p>

            <h1>{{ pokemon.name }}</h1>

            <div class="types-container">
              <span
                v-for="type in pokemon.types"
                :key="type"
                class="type-badge"
                :class="`type-${type.toLowerCase()}`"
              >
                {{ type }}
              </span>

              <span v-if="pokemon.types.length === 0" class="type-badge">
                Sin tipos disponibles
              </span>
            </div>
          </header>

          <section class="stats-section">
            <div class="section-heading">
              <span>01</span>

              <div>
                <h2>Estadísticas</h2>

                <p>Características principales del Pokémon seleccionado.</p>
              </div>
            </div>

            <div class="stats-grid">
              <article class="stat-card">
                <span>Vida</span>
                <strong>{{ pokemon.hp ?? "—" }}</strong>
              </article>

              <article class="stat-card highlight">
                <span>Ataque</span>
                <strong>{{ pokemon.attack ?? "—" }}</strong>
              </article>

              <article class="stat-card">
                <span>Defensa</span>
                <strong>{{ pokemon.defense ?? "—" }}</strong>
              </article>

              <article class="stat-card">
                <span>Velocidad</span>
                <strong>{{ pokemon.speed ?? "—" }}</strong>
              </article>

              <article class="stat-card">
                <span>Altura</span>
                <strong>{{ pokemon.height ?? "—" }}</strong>
              </article>

              <article class="stat-card">
                <span>Peso</span>
                <strong>{{ pokemon.weight ?? "—" }}</strong>
              </article>
            </div>
          </section>

          <p v-if="deleteError" class="delete-error">
            {{ deleteError }}
          </p>

          <div class="detail-actions">
            <RouterLink class="back-button" to="/home">
              ← Volver a Inicio
            </RouterLink>

            <button
              v-if="pokemon.createDb"
              class="delete-button"
              type="button"
              :disabled="isDeleting"
              @click="deletePokemon"
            >
              {{ isDeleting ? "Eliminando..." : "Eliminar Pokémon" }}
            </button>
          </div>
        </section>
      </article>
    </section>
  </main>
</template>

<style scoped>
.detail-page {
  min-height: calc(100vh - 68px);
  padding: 28px 0 38px;
}

.detail-container {
  width: min(1060px, calc(100% - 32px));
  margin: 0 auto;
}

.detail-card {
  display: grid;
  grid-template-columns: minmax(300px, 0.9fr) minmax(0, 1.35fr);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 22px;
  background: linear-gradient(
    145deg,
    rgba(23, 38, 61, 0.98),
    rgba(13, 24, 43, 0.98)
  );
  box-shadow: 0 22px 44px rgba(2, 8, 23, 0.3);
}

.visual-panel {
  position: relative;
  display: flex;
  min-height: 510px;
  flex-direction: column;
  padding: 20px;
  border-right: 1px solid rgba(255, 255, 255, 0.09);
  background:
    radial-gradient(circle at center, rgba(59, 130, 246, 0.2), transparent 54%),
    rgba(8, 17, 32, 0.5);
}

.visual-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pokemon-id {
  color: #94a3b8;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.1em;
}

.origin-badge {
  padding: 5px 9px;
  border: 1px solid rgba(96, 165, 250, 0.42);
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.14);
  color: #93c5fd;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.origin-badge.database {
  border-color: rgba(250, 204, 21, 0.42);
  background: rgba(250, 204, 21, 0.13);
  color: #fde047;
}

.image-container {
  position: relative;
  display: grid;
  flex: 1;
  place-items: center;
}

.image-glow {
  position: absolute;
  width: 245px;
  height: 245px;
  border-radius: 50%;
  background: rgba(59, 130, 246, 0.14);
  filter: blur(12px);
}

.detail-image {
  position: relative;
  z-index: 1;
  width: 285px;
  height: 285px;
  object-fit: contain;
  filter: drop-shadow(0 18px 16px rgba(2, 8, 23, 0.42));
  transition: transform 200ms ease;
}

.detail-image:hover {
  transform: scale(1.06);
}

.visual-caption {
  margin: 0;
  color: #64748b;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.18em;
  text-align: center;
  text-transform: uppercase;
}

.information-panel {
  display: flex;
  flex-direction: column;
  padding: 26px;
}

.eyebrow {
  margin: 0 0 7px;
  color: #facc15;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  color: #f8fafc;
  font-size: clamp(36px, 5vw, 54px);
  line-height: 1;
  text-transform: capitalize;
}

.types-container {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 14px;
}

.type-badge {
  padding: 6px 11px;
  border: 1px solid var(--type-border, rgba(255, 255, 255, 0.14));
  border-radius: 999px;
  background: var(--type-bg, rgba(255, 255, 255, 0.08));
  color: var(--type-text, #cbd5e1);
  font-size: 12px;
  font-weight: 800;
  text-transform: capitalize;
}

.stats-section {
  margin-top: 29px;
}

.section-heading {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 14px;
}

.section-heading > span {
  display: grid;
  width: 31px;
  height: 31px;
  flex-shrink: 0;
  place-items: center;
  border: 1px solid rgba(250, 204, 21, 0.34);
  border-radius: 50%;
  background: rgba(250, 204, 21, 0.1);
  color: #facc15;
  font-size: 11px;
  font-weight: 900;
}

h2 {
  margin: 0;
  color: #f8fafc;
  font-size: 17px;
}

.section-heading p {
  margin: 4px 0 0;
  color: #94a3b8;
  font-size: 12px;
  line-height: 1.4;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.stat-card {
  padding: 13px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 13px;
  background: rgba(255, 255, 255, 0.055);
}

.stat-card span {
  display: block;
  color: #94a3b8;
  font-size: 11px;
  font-weight: 700;
}

.stat-card strong {
  display: block;
  margin-top: 4px;
  color: #f8fafc;
  font-size: 24px;
}

.stat-card.highlight {
  border-color: rgba(250, 204, 21, 0.3);
  background: rgba(250, 204, 21, 0.08);
}

.stat-card.highlight strong {
  color: #facc15;
}

.detail-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: auto;
  padding-top: 24px;
}

.back-button,
.delete-button {
  display: inline-flex;
  min-height: 42px;
  align-items: center;
  justify-content: center;
  padding: 0 17px;
  border: 0;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 900;
  text-decoration: none;
  transition:
    transform 160ms ease,
    background-color 160ms ease,
    box-shadow 160ms ease;
}

.back-button {
  background: #ef4444;
  color: #ffffff;
  box-shadow: 0 8px 18px rgba(239, 68, 68, 0.24);
}

.back-button:hover {
  transform: translateY(-2px);
  background: #dc2626;
}

.delete-button {
  background: rgba(239, 68, 68, 0.12);
  color: #fca5a5;
}

.delete-button:hover:not(:disabled) {
  transform: translateY(-2px);
  background: rgba(239, 68, 68, 0.22);
}

.delete-button:disabled {
  cursor: not-allowed;
  opacity: 0.58;
}

.status-message,
.error-card {
  padding: 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.06);
}

.error-message,
.delete-error {
  color: #fca5a5;
}

.delete-error {
  margin: 18px 0 0;
  padding: 10px 12px;
  border: 1px solid rgba(248, 113, 113, 0.26);
  border-radius: 10px;
  background: rgba(239, 68, 68, 0.1);
  font-size: 13px;
}

@media (max-width: 820px) {
  .detail-card {
    grid-template-columns: 1fr;
  }

  .visual-panel {
    min-height: 300px;
    border-right: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.09);
  }

  .detail-image {
    width: 220px;
    height: 220px;
  }
}

@media (max-width: 520px) {
  .detail-page {
    padding-top: 20px;
  }

  .detail-container {
    width: min(100% - 22px, 1060px);
  }

  .information-panel {
    padding: 19px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .detail-actions {
    flex-direction: column;
  }

  .back-button,
  .delete-button {
    width: 100%;
  }
}
</style>
