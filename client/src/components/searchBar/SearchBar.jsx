import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName } from "../../redux/actions";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim()) return;

    dispatch(getPokemonByName(name.trim().toLowerCase()));
    setName("");
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Buscar Pokémon..."
        value={name}
        onChange={handleInputChange}
      />

      <button className={styles.searchButton} type="submit">
        🔍
      </button>
    </form>
  );
};

export default SearchBar;