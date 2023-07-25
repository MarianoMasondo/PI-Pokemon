import { useEffect } from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import styles from"./DetailPage.module.css";
import { getPokemonDetail } from "../../redux/actions";

const DetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const pokemonDetail = useSelector((state) => state.pokemonDetail)

    useEffect (() => {
        dispatch(getPokemonDetail(id));
    }, [dispatch, id]);
    
    return(
        <div className={styles.detailContainer}>
        <h1>Esto es Detail</h1>
            <h1 className={styles.h1}>{pokemonDetail.name}</h1>
            <div>
                <img src={pokemonDetail.image} className={styles.image} alt="" />
            </div>
            <p>HP: {pokemonDetail.hp}</p>
            <p>Attack: {pokemonDetail.attack}</p>
            <p>Defense: {pokemonDetail.defense}</p>
            <p>Speed: {pokemonDetail.speed}</p>
            <p>Height: {pokemonDetail.height}</p>
            <p>Weight: {pokemonDetail.weight}</p>
            <p>Types: {pokemonDetail.type && pokemonDetail.type.join(", ")}</p>
            <p>ID: {pokemonDetail.id}</p>
        </div>
    )
}

export default DetailPage;