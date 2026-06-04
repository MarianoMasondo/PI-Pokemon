import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemons: [],
    pokemonDetail: null,
    types: [],

    isLoadingPokemons: false,
    isLoadingDetail: false,

    pokemonsError: '',
    detailError: '',
  }),

  actions: {
    async getPokemons() {
      this.isLoadingPokemons = true
      this.pokemonsError = ''

      try {
        const response = await axios.get(`${API_URL}/pokemons`)

        this.pokemons = response.data
      } catch (error) {
        this.pokemonsError =
          error.response?.data?.error ||
          'No se pudieron cargar los Pokémon.'
      } finally {
        this.isLoadingPokemons = false
      }
    },

    async getPokemonDetail(id) {
      this.isLoadingDetail = true
      this.detailError = ''
      this.pokemonDetail = null

      try {
        const response = await axios.get(
          `${API_URL}/pokemons/${id}`
        )

        const pokemon = response.data

        this.pokemonDetail = {
          ...pokemon,
          types:
            pokemon.types ??
            pokemon.Types?.map((type) => type.name) ??
            [],
        }
      } catch (error) {
        this.detailError =
          error.response?.data?.error ||
          'No se pudo cargar el detalle del Pokémon.'
      } finally {
        this.isLoadingDetail = false
      }
    },

    async getTypes() {
      const response = await axios.get(`${API_URL}/types`)

      this.types = response.data
    },

    async createPokemon(newPokemon) {
      await axios.post(`${API_URL}/pokemons`, newPokemon)

      await this.getPokemons()
    },
  },
})