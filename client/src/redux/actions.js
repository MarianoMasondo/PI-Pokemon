import axios from "axios";
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_DETAIL_POKEMON = "GET_DETAIL_POKEMON";
export const SEARCH_POKEMON = "SEARCH_POKEMON";
export const SORT_POKEMONS_ASC_DESC = "SORT_POKEMONS_ASC_DESC";
export const ORDER_POKEMON_ATTACK = "ORDER_POKEMON_ATTACK";
export const FILTER_TYPES = "FILTER_TYPES";
export const FILTER_APIDB = "FILTER_APIDB";
export const ALL_TYPES = "ALL_TYPES";
export const ADD_POKEMON_TO_DB = "ADD_POKEMON_TO_DB";


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

export const filterType = (payload) => {
    return{
        type: FILTER_TYPES,
        payload,
    }
}

export const filterApiDb = (payload) => {
    return{
        type: FILTER_APIDB,
        payload,
    }
}

export const addPokemonToDb = (pokemon) => {
    return {
      type: ADD_POKEMON_TO_DB,
      payload: pokemon,
    };
  };

export const allTypes = () => {
    return async (dispatch) => {
        try {
            const apiData = await axios.get("http://localhost:3001/types")
            const types = apiData.data;
            dispatch({
                type: ALL_TYPES,
                payload: types
            })
        }catch(error){
            console.log(error.message)
        }
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