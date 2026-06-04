<script setup>
defineProps({
    pokemon: {
        type: Object,
        required: true,
    },
})
</script>

<template>
    <article class="pokemon-card">
        <img
        class="pokemon-image"
        :src="pokemon.image"
        :alt="pokemon.name"
        />

        <h2>{{ pokemon.name }}</h2>

        <p>
            <strong>Tipos:</strong>
            {{ pokemon.types.join(", ") }}
            </p>

        <p>
            <strong>Ataque:</strong>
            {{ pokemon.attack }}
            </p>    
        </article>
    </template>

    <style scoped>
    .pokemon-card{
        width: 220px;
        padding: 16px;
        border: 1px solid #cccccc;
        border-radius: 12px;
        background-color: white;
        text-align: center;
    }

    .pokemon-image{
        width: 140px;
        height: 140px;
        object-fit: contain;
    }

    h2{
        text-transform: capitalize;
    }
    </style>