<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePokemonStore } from '@/stores/pokemonStore'

const pokemonStore = usePokemonStore()
const router = useRouter()

const errorMessage = ref('')
const isSubmitting = ref(false)

const form = reactive({
  name: '',
  image: '',
  hp: '',
  attack: '',
  defense: '',
  speed: '',
  height: '',
  weight: '',
  types: [],
})

onMounted(() => {
  pokemonStore.getTypes()
})

const isTypeDisabled = (typeName) => {
  return (
    form.types.length >= 2 &&
    !form.types.includes(typeName)
  )
}

const handleSubmit = async () => {
  errorMessage.value = ''

  const hasEmptyField =
    !form.name.trim() ||
    !form.image.trim() ||
    !form.hp ||
    !form.attack ||
    !form.defense ||
    !form.speed ||
    !form.height ||
    !form.weight

  if (hasEmptyField) {
    errorMessage.value = 'Completá todos los campos obligatorios.'
    return
  }

  if (form.types.length === 0) {
    errorMessage.value = 'Seleccioná al menos un tipo.'
    return
  }

  try {
    isSubmitting.value = true

    await pokemonStore.createPokemon({
      ...form,
      name: form.name.trim().toLowerCase(),
      image: form.image.trim(),
    })

    router.push('/home')
  } catch (error) {
    errorMessage.value =
      error.response?.data?.error ||
      'No se pudo crear el Pokémon.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="form-page">
    <h1>Crear Pokémon</h1>

    <form class="pokemon-form" @submit.prevent="handleSubmit">
      <label>
        Nombre:
        <input
          v-model="form.name"
          type="text"
          placeholder="Ejemplo: pikamariano"
        />
      </label>

      <label>
        URL de la imagen:
        <input
          v-model="form.image"
          type="text"
          placeholder="https://..."
        />
      </label>

      <label>
        Vida:
        <input
          v-model.number="form.hp"
          type="number"
          min="1"
        />
      </label>

      <label>
        Ataque:
        <input
          v-model.number="form.attack"
          type="number"
          min="1"
        />
      </label>

      <label>
        Defensa:
        <input
          v-model.number="form.defense"
          type="number"
          min="1"
        />
      </label>

      <label>
        Velocidad:
        <input
          v-model.number="form.speed"
          type="number"
          min="1"
        />
      </label>

      <label>
        Altura:
        <input
          v-model.number="form.height"
          type="number"
          min="1"
        />
      </label>

      <label>
        Peso:
        <input
          v-model.number="form.weight"
          type="number"
          min="1"
        />
      </label>

      <fieldset>
        <legend>
          Tipos: elegí uno o dos
        </legend>

        <label
          v-for="type in pokemonStore.types"
          :key="type.id || type.name"
          class="type-option"
        >
          <input
            v-model="form.types"
            type="checkbox"
            :value="type.name"
            :disabled="isTypeDisabled(type.name)"
          />

          {{ type.name }}
        </label>
      </fieldset>

      <p v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </p>

      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Creando...' : 'Crear Pokémon' }}
      </button>
    </form>
  </main>
</template>

<style scoped>
.form-page {
  padding: 24px;
}

.pokemon-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 520px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

input {
  padding: 8px;
  border: 1px solid #cccccc;
  border-radius: 6px;
}

fieldset {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  border: 1px solid #cccccc;
  border-radius: 8px;
}

.type-option {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  text-transform: capitalize;
}

button {
  padding: 10px 16px;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
}

.error-message {
  color: crimson;
}
</style>