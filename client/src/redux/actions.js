import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_DETAIL_POKEMON = "GET_POKEMON";
export const SEARCH_POKEMON = "SEARCH_POKEMON";
export const SORT_POKEMONS_ASC_DESC = "SORT_POKEMONS_ASC_DESC";
export const ORDER_POKEMON_ATTACK = "ORDER_POKEMON_ATTACK";

export const getPokemons = () => {
    return async function(dispatch){
        const apiData = await axios.get(`http://localhost:3001/pokemons/`);
        const pokemons = apiData.data
        dispatch({ type: GET_POKEMONS, payload: pokemons});

    }
}

export const getPokemonDetail = (id) => {
    return async function(dispatch){
        const apiData = await axios.get(`http://localhost:3001/pokemons/${id}`);
        const pokemonDetail =apiData.data;
        dispatch({type: GET_DETAIL_POKEMON, payload: pokemonDetail})
    }
}

export const searchPokemon = (name) => {
    return {
        type: SEARCH_POKEMON,
        payload: name,
    }
}

export const orderPokemons = (payload) => {
    return ({
    type: SORT_POKEMONS_ASC_DESC,
    payload,
    })
}

export const orderAttack = (payload) => {
    return ({
        type: ORDER_POKEMON_ATTACK,
        payload,
    })
}