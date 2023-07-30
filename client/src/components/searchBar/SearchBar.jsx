import { useDispatch } from "react-redux";
import styles from "./SearchBar.module.css";
import React, { useState } from "react";
import { getPokemons, searchPokemon } from "../../redux/actions"; 

const SearchBar = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    const handleChange = (event) => {
        event.preventDefault();
        setName(event.target.value);
        dispatch(searchPokemon(event.target.value));
    }
    
    const handleReset = (event) => {
        event.preventDefault();
        dispatch(getPokemons()); 
    }

    return (
        <div className={styles.inputContainer}>
            <form action="">
                <input 
                    onChange={handleChange} 
                    placeholder="Search Pokemon..." 
                    type="search" 
                    value={name}
                /> 
                <button onClick={handleReset}>Reset</button> 
            </form>
        </div>
    );
}
export default SearchBar;
