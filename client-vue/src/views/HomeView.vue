<script setup>
import { onMounted } from 'vue';
import { usePokemonStore } from '@/stores/pokemonStore';
import PokemonCard from '@/components/PokemonCard.vue';

const pokemonStore = usePokemonStore()

onMounted(() => {
    pokemonStore.getPokemons()
})
</script>

<template>
    <main>
        <h1>Pokémon con Vue</h1>
        <p>cantidad recibida: {{ pokemonStore.pokemons.length }}</p>

        <section class="cards-container">
            <PokemonCard
            v-for="pokemon in pokemonStore.pokemons"
            :key="pokemon.id"
            :pokemon="pokemon"
            />
            </section>
    </main>
</template>

<style scoped>
main{
    padding: 24px;
}

.cards-container {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}
</style>