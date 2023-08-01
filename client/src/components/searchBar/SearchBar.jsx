import { useDispatch } from "react-redux";
import styles from "./SearchBar.module.css";
import React, { useState } from "react";
import { searchPokemon } from "../../redux/actions"; 

const SearchBar = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    const handleChange = (event) => {
        event.preventDefault();
        setName(event.target.value);
        dispatch(searchPokemon(event.target.value));
    }
    
    // const handleReset = (event) => {
    //     event.preventDefault();
    //     dispatch(getPokemons());
    //     setName(""); // Aquí establecemos el valor del campo de búsqueda a una cadena vacía
    // }

    return (
        <div className={styles.input}>
            <form action="">
                <input 
                    onChange={handleChange} 
                    placeholder="Search Pokemon..." 
                    type="search" 
                    value={name}
                /> 
                {/* <button onClick={handleReset}>Reset</button>  */}
            </form>
        </div>
    );
}

export default SearchBar;
