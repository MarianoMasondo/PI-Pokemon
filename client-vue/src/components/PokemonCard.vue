<script setup>
const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["delete-pokemon"]);

const handleDelete = () => {
  emit("delete-pokemon", props.pokemon.id);
};
</script>

<template>
  <article class="pokemon-card">
    <div class="card-top">
      <span class="pokemon-id"> #{{ pokemon.id.toString().slice(0, 8) }} </span>

      <span class="origin-badge" :class="{ database: pokemon.createDb }">
        {{ pokemon.createDb ? "Creado" : "API" }}
      </span>
    </div>

    <div class="image-container">
      <img class="pokemon-image" :src="pokemon.image" :alt="pokemon.name" />
    </div>

    <div class="card-content">
      <h2>{{ pokemon.name }}</h2>

      <div class="types-container">
        <span
          v-for="type in pokemon.types"
          :key="type"
          class="type-badge"
          :class="`type-${type.toLowerCase()}`"
        >
          {{ type }}
        </span>
      </div>

      <div class="stat">
        <span>Ataque</span>
        <strong>{{ pokemon.attack }}</strong>
      </div>

      <div class="card-actions">
        <RouterLink class="detail-button" :to="`/detail/${pokemon.id}`">
          Ver detalle
        </RouterLink>

        <button
          v-if="pokemon.createDb"
          class="delete-button"
          type="button"
          @click="handleDelete"
        >
          Eliminar
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.pokemon-card {
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 17px;
  background: linear-gradient(
    145deg,
    rgba(23, 38, 61, 0.98),
    rgba(13, 24, 43, 0.98)
  );
  box-shadow: 0 10px 22px rgba(2, 8, 23, 0.2);
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease;
}

.pokemon-card:hover {
  transform: translateY(-5px);
  border-color: rgba(250, 204, 21, 0.45);
  box-shadow: 0 17px 30px rgba(2, 8, 23, 0.34);
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 13px 0;
}

.pokemon-id {
  color: #94a3b8;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.origin-badge {
  padding: 3px 7px;
  border: 1px solid rgba(96, 165, 250, 0.35);
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.12);
  color: #93c5fd;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.origin-badge.database {
  border-color: rgba(250, 204, 21, 0.35);
  background: rgba(250, 204, 21, 0.12);
  color: #fde047;
}

.image-container {
  display: grid;
  min-height: 132px;
  place-items: center;
  padding: 4px 10px;
}

.pokemon-image {
  width: 128px;
  height: 128px;
  object-fit: contain;
  filter: drop-shadow(0 9px 9px rgba(2, 8, 23, 0.3));
  transition: transform 180ms ease;
}

.pokemon-card:hover .pokemon-image {
  transform: scale(1.07);
}

.card-content {
  padding: 0 13px 13px;
}

h2 {
  margin: 0;
  color: #f8fafc;
  font-size: 18px;
  line-height: 1.1;
  text-transform: capitalize;
}

.types-container {
  display: flex;
  min-height: 24px;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 8px;
}

.type-badge {
  padding: 3px 7px;
  border: 1px solid var(--type-border, rgba(255, 255, 255, 0.14));
  border-radius: 999px;
  background: var(--type-bg, rgba(255, 255, 255, 0.08));
  color: var(--type-text, #cbd5e1);
  font-size: 10px;
  font-weight: 800;
  text-transform: capitalize;
}

.stat {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  padding-top: 9px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  color: #a7b4cc;
  font-size: 12px;
}

.stat strong {
  color: #facc15;
  font-size: 15px;
}

.card-actions {
  display: flex;
  gap: 6px;
  margin-top: 11px;
}

.detail-button,
.delete-button {
  display: inline-flex;
  min-height: 34px;
  flex: 1;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 9px;
  font-size: 11px;
  font-weight: 800;
  text-decoration: none;
  transition:
    transform 160ms ease,
    background-color 160ms ease;
}

.detail-button {
  background: #ef4444;
  color: #ffffff;
}

.detail-button:hover {
  transform: translateY(-2px);
  background: #dc2626;
}

.delete-button {
  background: rgba(255, 255, 255, 0.09);
  color: #fca5a5;
}

.delete-button:hover {
  transform: translateY(-2px);
  background: rgba(239, 68, 68, 0.2);
}

@media (max-width: 560px) {
  .image-container {
    min-height: 118px;
  }

  .pokemon-image {
    width: 112px;
    height: 112px;
  }

  h2 {
    font-size: 16px;
  }
}
</style>
