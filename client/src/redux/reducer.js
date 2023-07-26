import { GET_DETAIL_POKEMON, GET_POKEMONS, ORDER_POKEMON_ATTACK, SEARCH_POKEMON, SORT_POKEMONS_ASC_DESC } from "./actions";

const initialState = {
    pokemons: [],
    pokemonDetail: [],
    searchPokemon: [],
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_POKEMONS:
            return { ...state, pokemons: action.payload}

        case GET_DETAIL_POKEMON:
            return { ...state, pokemonDetail: action.payload}

        case SEARCH_POKEMON:
            return {
                ...state,
                pokemons: state.pokemons.filter((pokemon) => 
                pokemon.name.toLowerCase().includes(action.payload.toLowerCase()))
            }
            
            case SORT_POKEMONS_ASC_DESC:
                let pokemonsSort = [...state.pokemons];
          
                pokemonsSort.sort((a, b) => {
                  if (action.payload === "asc") {
                    return a.name.localeCompare(b.name);
                  } else {
                    return b.name.localeCompare(a.name);
                  }
                });
                return {
                  ...state,
                  pokemons: pokemonsSort,
                };
          
              case ORDER_POKEMON_ATTACK:
                let pokemonsAttack =
                  action.payload === "lowest"
                    ? [...state.pokemons].sort((a, b) => b.attack - a.attack)
                    : [...state.pokemons].sort((a, b) => a.attack - b.attack);
                return {
                  ...state,
                  pokemons: pokemonsAttack,
                };
          
              default:
                return { ...state };
            }
}

export default reducer;