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

const isValidImageUrl = (url) => {
  try {
    const parsedUrl = new URL(url)

    return (
      parsedUrl.protocol === 'http:' ||
      parsedUrl.protocol === 'https:'
    )
  } catch {
    return false
  }
}

const isPositiveNumber = (value) => {
  return Number.isFinite(value) && value > 0
}

const handleSubmit = async () => {
  errorMessage.value = ''

  const normalizedName = form.name.trim()
  const normalizedImage = form.image.trim()

  if (!normalizedName) {
    errorMessage.value = 'Ingresá un nombre.'
    return
  }

  const validName = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s-]+$/

  if (!validName.test(normalizedName)) {
    errorMessage.value =
      'El nombre solamente puede contener letras, espacios o guiones.'
    return
  }

  if (!normalizedImage) {
    errorMessage.value = 'Ingresá la URL de una imagen.'
    return
  }

  if (!isValidImageUrl(normalizedImage)) {
    errorMessage.value =
      'La imagen debe tener una URL válida que comience con http o https.'
    return
  }

  if (!isPositiveNumber(form.hp)) {
    errorMessage.value = 'La vida debe ser un número mayor que cero.'
    return
  }

  if (!isPositiveNumber(form.attack)) {
    errorMessage.value = 'El ataque debe ser un número mayor que cero.'
    return
  }

  if (!isPositiveNumber(form.defense)) {
    errorMessage.value = 'La defensa debe ser un número mayor que cero.'
    return
  }

  const optionalStats = [
    { label: 'velocidad', value: form.speed },
    { label: 'altura', value: form.height },
    { label: 'peso', value: form.weight },
  ]

  for (const stat of optionalStats) {
    const hasValue =
      stat.value !== '' &&
      stat.value !== null &&
      stat.value !== undefined

    if (hasValue && !isPositiveNumber(stat.value)) {
      errorMessage.value =
        `La ${stat.label} debe ser un número mayor que cero.`
      return
    }
  }

  if (form.types.length === 0) {
    errorMessage.value = 'Seleccioná al menos un tipo.'
    return
  }

  if (form.types.length > 2) {
    errorMessage.value = 'Podés seleccionar como máximo dos tipos.'
    return
  }

  try {
    isSubmitting.value = true

    await pokemonStore.createPokemon({
      ...form,
      name: normalizedName.toLowerCase(),
      image: normalizedImage,
      speed: form.speed || null,
  height: form.height || null,
  weight: form.weight || null,
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
          placeholder="Ejemplo: Pokejemplo"
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
        />
      </label>

      <label>
        Ataque:
        <input
          v-model.number="form.attack"
          type="number"
        />
      </label>

      <label>
        Defensa:
        <input
          v-model.number="form.defense"
          type="number"
        />
      </label>

      <label>
        Velocidad:
        <input
          v-model.number="form.speed"
          type="number"
        />
      </label>

      <label>
        Altura:
        <input
          v-model.number="form.height"
          type="number"
        />
      </label>

      <label>
        Peso:
        <input
          v-model.number="form.weight"
          type="number"
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