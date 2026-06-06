<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { usePokemonStore } from "@/stores/pokemonStore";

const pokemonStore = usePokemonStore();
const router = useRouter();

const errorMessage = ref("");
const isSubmitting = ref(false);

const form = reactive({
  name: "",
  image: "",
  hp: "",
  attack: "",
  defense: "",
  speed: "",
  height: "",
  weight: "",
  types: [],
});

onMounted(() => {
  pokemonStore.getTypes();
});

const isTypeDisabled = (typeName) => {
  return form.types.length >= 2 && !form.types.includes(typeName);
};

const isValidImageUrl = (url) => {
  try {
    const parsedUrl = new URL(url);

    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
};

const isPositiveNumber = (value) => {
  return Number.isFinite(value) && value > 0;
};

const handleSubmit = async () => {
  errorMessage.value = "";

  const normalizedName = form.name.trim();
  const normalizedImage = form.image.trim();

  if (!normalizedName) {
    errorMessage.value = "Ingresá un nombre.";
    return;
  }

  const validName = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s-]+$/;

  if (!validName.test(normalizedName)) {
    errorMessage.value =
      "El nombre solamente puede contener letras, espacios o guiones.";
    return;
  }

  if (!normalizedImage) {
    errorMessage.value = "Ingresá la URL de una imagen.";
    return;
  }

  if (!isValidImageUrl(normalizedImage)) {
    errorMessage.value =
      "La imagen debe tener una URL válida que comience con http o https.";
    return;
  }

  if (!isPositiveNumber(form.hp)) {
    errorMessage.value = "La vida debe ser un número mayor que cero.";
    return;
  }

  if (!isPositiveNumber(form.attack)) {
    errorMessage.value = "El ataque debe ser un número mayor que cero.";
    return;
  }

  if (!isPositiveNumber(form.defense)) {
    errorMessage.value = "La defensa debe ser un número mayor que cero.";
    return;
  }

  const optionalStats = [
    { label: "velocidad", value: form.speed },
    { label: "altura", value: form.height },
    { label: "peso", value: form.weight },
  ];

  for (const stat of optionalStats) {
    const hasValue =
      stat.value !== "" && stat.value !== null && stat.value !== undefined;

    if (hasValue && !isPositiveNumber(stat.value)) {
      errorMessage.value = `La ${stat.label} debe ser un número mayor que cero.`;
      return;
    }
  }

  if (form.types.length === 0) {
    errorMessage.value = "Seleccioná al menos un tipo.";
    return;
  }

  if (form.types.length > 2) {
    errorMessage.value = "Podés seleccionar como máximo dos tipos.";
    return;
  }

  try {
    isSubmitting.value = true;

    await pokemonStore.createPokemon({
      ...form,
      name: normalizedName.toLowerCase(),
      image: normalizedImage,
      speed: form.speed || null,
      height: form.height || null,
      weight: form.weight || null,
    });

    router.push("/home");
  } catch (error) {
    errorMessage.value =
      error.response?.data?.error || "No se pudo crear el Pokémon.";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <main class="form-page">
    <section class="form-container">
      <header class="form-hero">
        <div>
          <p class="eyebrow">Crear registro</p>

          <h1>Diseñá tu propio Pokémon</h1>

          <p class="hero-description">
            Completá sus características y elegí uno o dos tipos. Los campos
            marcados con un asterisco son obligatorios.
          </p>
        </div>

        <div class="hero-badge">
          <span>Pokédex</span>
          <strong>Nuevo</strong>
        </div>
      </header>

      <form class="pokemon-form" @submit.prevent="handleSubmit">
        <div class="form-layout">
          <section class="form-card">
            <div class="section-heading">
              <span>01</span>

              <div>
                <h2>Información principal</h2>

                <p>
                  Definí el nombre y la imagen que aparecerán en la tarjeta.
                </p>
              </div>
            </div>

            <div class="main-fields">
              <label class="field">
                <span>
                  Nombre
                  <strong>*</strong>
                </span>

                <input
                  v-model="form.name"
                  type="text"
                  placeholder="Ejemplo: Pokejemplo"
                />
              </label>

              <label class="field">
                <span>
                  URL de la imagen
                  <strong>*</strong>
                </span>

                <input
                  v-model="form.image"
                  type="text"
                  placeholder="https://..."
                />
              </label>
            </div>
          </section>

          <section class="form-card">
            <div class="section-heading">
              <span>02</span>

              <div>
                <h2>Estadísticas</h2>

                <p>Vida, ataque y defensa son obligatorios.</p>
              </div>
            </div>

            <div class="stats-grid">
              <label class="field">
                <span>
                  Vida
                  <strong>*</strong>
                </span>

                <input
                  v-model.number="form.hp"
                  type="number"
                  placeholder="Ejemplo: 80"
                />
              </label>

              <label class="field">
                <span>
                  Ataque
                  <strong>*</strong>
                </span>

                <input
                  v-model.number="form.attack"
                  type="number"
                  placeholder="Ejemplo: 90"
                />
              </label>

              <label class="field">
                <span>
                  Defensa
                  <strong>*</strong>
                </span>

                <input
                  v-model.number="form.defense"
                  type="number"
                  placeholder="Ejemplo: 70"
                />
              </label>

              <label class="field">
                <span>Velocidad</span>

                <input
                  v-model.number="form.speed"
                  type="number"
                  placeholder="Opcional"
                />
              </label>

              <label class="field">
                <span>Altura</span>

                <input
                  v-model.number="form.height"
                  type="number"
                  placeholder="Opcional"
                />
              </label>

              <label class="field">
                <span>Peso</span>

                <input
                  v-model.number="form.weight"
                  type="number"
                  placeholder="Opcional"
                />
              </label>
            </div>
          </section>
        </div>

        <section class="form-card types-card">
          <div class="section-heading">
            <span>03</span>

            <div>
              <h2>Tipos</h2>

              <p>Seleccioná como mínimo uno y como máximo dos.</p>
            </div>
          </div>

          <div class="types-grid">
            <label
              v-for="type in pokemonStore.types"
              :key="type.id || type.name"
              class="type-option"
              :class="{
                selected: form.types.includes(type.name),
                disabled: isTypeDisabled(type.name),
              }"
            >
              <input
                v-model="form.types"
                type="checkbox"
                :value="type.name"
                :disabled="isTypeDisabled(type.name)"
              />

              <span>{{ type.name }}</span>
            </label>
          </div>
        </section>

        <p v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </p>

        <div class="form-actions">
          <RouterLink class="cancel-button" to="/home"> Cancelar </RouterLink>

          <button class="submit-button" type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? "Creando..." : "Crear Pokémon" }}
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<style scoped>
.form-page {
  min-height: calc(100vh - 68px);
  padding: 22px 0 32px;
}

.form-container {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
}

.form-hero {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 16px;
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
  margin: 0;
  color: #f8fafc;
  font-size: clamp(30px, 4vw, 44px);
  line-height: 1.04;
}

.hero-description {
  max-width: 680px;
  margin: 10px 0 0;
  color: #a7b4cc;
  font-size: 14px;
  line-height: 1.55;
}

.hero-badge {
  min-width: 135px;
  padding: 13px 16px;
  border: 1px solid rgba(250, 204, 21, 0.28);
  border-radius: 15px;
  background: rgba(250, 204, 21, 0.08);
}

.hero-badge span {
  display: block;
  color: #cbd5e1;
  font-size: 11px;
  font-weight: 700;
}

.hero-badge strong {
  display: block;
  margin-top: 3px;
  color: #facc15;
  font-size: 24px;
}

.pokemon-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.form-layout {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: 14px;
}

.form-card {
  padding: 17px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 17px;
  background: linear-gradient(
    145deg,
    rgba(23, 38, 61, 0.95),
    rgba(13, 24, 43, 0.95)
  );
  box-shadow: 0 14px 26px rgba(2, 8, 23, 0.18);
}

.section-heading {
  display: flex;
  align-items: flex-start;
  gap: 11px;
  margin-bottom: 15px;
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

.main-fields {
  display: grid;
  gap: 12px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 11px;
}

.field {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 5px;
}

.field > span {
  color: #cbd5e1;
  font-size: 12px;
  font-weight: 700;
}

.field strong {
  color: #f87171;
}

.field input {
  width: 100%;
  min-height: 39px;
  padding: 9px 11px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 9px;
  background: #f8fafc;
  color: #111827;
  font-size: 13px;
  outline: none;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.field input:focus {
  border-color: #facc15;
  box-shadow: 0 0 0 3px rgba(250, 204, 21, 0.14);
}

.types-card {
  padding-bottom: 15px;
}

.types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(94px, 1fr));
  gap: 8px;
}

.type-option {
  display: flex;
  min-height: 34px;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 7px 8px;
  border: 1px solid rgba(255, 255, 255, 0.11);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  color: #cbd5e1;
  font-size: 12px;
  font-weight: 800;
  text-transform: capitalize;
  cursor: pointer;
  transition:
    transform 150ms ease,
    border-color 150ms ease,
    background-color 150ms ease,
    color 150ms ease;
}

.type-option:hover {
  transform: translateY(-2px);
  border-color: rgba(250, 204, 21, 0.42);
  color: #f8fafc;
}

.type-option.selected {
  border-color: rgba(250, 204, 21, 0.72);
  background: rgba(250, 204, 21, 0.16);
  color: #fde047;
}

.type-option.disabled {
  cursor: not-allowed;
  opacity: 0.42;
}

.type-option input {
  accent-color: #facc15;
}

.error-message {
  margin: 0;
  padding: 11px 13px;
  border: 1px solid rgba(248, 113, 113, 0.28);
  border-radius: 10px;
  background: rgba(239, 68, 68, 0.1);
  color: #fca5a5;
  font-size: 13px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.cancel-button,
.submit-button {
  display: inline-flex;
  min-height: 42px;
  align-items: center;
  justify-content: center;
  padding: 0 18px;
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

.cancel-button {
  background: rgba(255, 255, 255, 0.08);
  color: #cbd5e1;
}

.cancel-button:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.14);
}

.submit-button {
  background: #ef4444;
  color: #ffffff;
  box-shadow: 0 8px 18px rgba(239, 68, 68, 0.26);
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  background: #dc2626;
  box-shadow: 0 12px 22px rgba(239, 68, 68, 0.34);
}

.submit-button:disabled {
  cursor: not-allowed;
  opacity: 0.58;
}

@media (max-width: 900px) {
  .form-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 700px) {
  .form-page {
    padding-top: 24px;
  }

  .form-container {
    width: min(100% - 22px, 1120px);
  }

  .form-hero {
    display: block;
  }

  .hero-badge {
    width: 100%;
    margin-top: 15px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .cancel-button,
  .submit-button {
    width: 100%;
  }
}

@media (max-width: 430px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .types-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
