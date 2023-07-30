import React, { useEffect, useState } from "react";
import styles from"./HomePage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../redux/actions";
import Cards from "../../components/card/Card";
import Pagination from "../../components/pagination/Pagination";


const HomePage = () => {
    const dispatch = useDispatch();

    const allPokemons = useSelector((state) => state.pokemons);
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage] = useState(12);
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        dispatch(getPokemons());
    }, [dispatch]);

    return (
        <div>
            <div className={styles.homeContainer}>
                <h1>Esto es Home</h1>
            </div>
            <div className={`${styles.paginationContainerCards} ${styles.cardContainer}`}>
                {currentPokemons?.map((pokemon) => {
                    return (
                      <Cards
                            key={pokemon.id}
                            id={pokemon.id}
                            name={pokemon.name}
                            image={pokemon.image}
                            hp={pokemon.hp}
                            attack={pokemon.attack}
                            defense={pokemon.defense}
                            speed={pokemon.speed}
                            height={pokemon.height}
                            weight={pokemon.weight}
                            types={pokemon.types}
                        />
                    );
                })}
            </div>
            <div className={styles.paginationContainer}>
            <Pagination
  currentPage={currentPage}
  pokemonsPerPage={pokemonsPerPage}
  allPokemons={allPokemons}
  paginate={paginate}
/>
            </div>
        </div>
    );
}

export default HomePage;
