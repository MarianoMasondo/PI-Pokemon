import { GET_DETAIL_POKEMON, GET_POKEMONS, SEARCH_POKEMON } from "./actions";

const initialState = {
    pokemons: [],
    pokemonDetail: [],
    searchPokemon: [],
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_POKEMONS:
            return { ...state, pokemons: action.payload}
        default:
            return { ...state }

        case GET_DETAIL_POKEMON:
            return { ...state, pokemonDetail: action.payload}

        case SEARCH_POKEMON:
            return {
                ...state,
                pokemons: state.pokemons.filter((pokemon) => 
                pokemon.name.toLowerCase().includes(action.payload.toLowerCase()))
            }
            
       
    }
}

export default reducer;