import { defineStore } from "pinia";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

export const usePokemonStore = defineStore("pokemon", {
    state: () => ({
        pokemons: [],
    }),

    actions: {
        async getPokemons(){
            const response = await axios.get(`${API_URL}/pokemons`)

            this.pokemons = response.data
        },
    },
})