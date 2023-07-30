import React from "react";
import Card from "../card/Card";
import  styles from "./Cards.module.css";
import { useSelector } from "react-redux";

const Cards = () => {

    const pokemons = useSelector(state=>state.pokemons)
    return(
        <div className={styles.cardsContainer}>
            {pokemons.map((pokemon) => {
                return <Card
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
        })}
        </div>
    )
}

export default Cards;