import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchPokemon } from "../../redux/actions";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const dispatch = useDispatch();

  const pokemons = useSelector((state) => state.pokemons);

  const [name, setName] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = useMemo(() => {
    if (!name.trim()) return [];

    if (!Array.isArray(pokemons)) return [];

    const searchText = name.trim().toLowerCase();

    return pokemons
      .filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchText)
      )
      .slice(0, 6);
  }, [name, pokemons]);

  const handleInputChange = (event) => {
    setName(event.target.value);
    setShowSuggestions(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim()) return;

    dispatch(searchPokemon(name.trim().toLowerCase()));
    setName("");
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (pokemonName) => {
    dispatch(searchPokemon(pokemonName.toLowerCase()));
    setName("");
    setShowSuggestions(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 150);
  };

  return (
    <div className={styles.searchWrapper}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Buscar Pokémon..."
          value={name}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          onBlur={handleBlur}
        />

        <button className={styles.searchButton} type="submit">
          🔍
        </button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <ul className={styles.suggestionsList}>
          {suggestions.map((pokemon) => (
            <li key={pokemon.id}>
              <button
                type="button"
                className={styles.suggestionItem}
                onClick={() => handleSuggestionClick(pokemon.name)}
              >
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className={styles.suggestionImage}
                />

                <span>{pokemon.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {showSuggestions && name.trim() && suggestions.length === 0 && (
        <div className={styles.noResults}>
          No hay coincidencias
        </div>
      )}
    </div>
  );
};

export default SearchBar;