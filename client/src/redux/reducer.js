import { GET_DETAIL_POKEMON, GET_POKEMONS } from "./actions";

const initialState = {
    pokemons: [],
    pokemonDetail: []
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_POKEMONS:
            return { ...state, pokemons: action.payload}
        default:
            return { ...state }

        case GET_DETAIL_POKEMON:
            return { ...state, pokemonDetail: action.payload}
            
       
    }
}

export default reducer;