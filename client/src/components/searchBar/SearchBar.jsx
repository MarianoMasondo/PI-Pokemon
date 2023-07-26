import { useDispatch } from "react-redux";
import styles from "./SearchBar.module.css";
import { useState } from "react";
import { searchPokemon } from "../../redux/actions";

export const SearchBar = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    const handleChange = (event) => {
        event.preventDefault();
        setName(event.target.value);
        // dispatch(searchPokemon(event.target.value)) para buscar juegos que coincidan con la letra ingresada pero no me haría falta el botón
    }

    const handleSearch = (event) => {
        event.preventDefault();
        if(!name){
            return alert("Please, insert a Pokemon name") 
        }
        dispatch(searchPokemon(name));
        setName("");
    }

    return (
<div className={styles.inputContainer}>
    <form action="">
  <input 
    onChange={handleChange} 
    type="search" 
    placeholder="Search Pokemon..." 
    value={name}/> 
  <button onClick={handleSearch} type="submit">Go</button>

    </form>
</div>

    )
}
