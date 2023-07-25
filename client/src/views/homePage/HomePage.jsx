import { useEffect } from "react";
import styles from"./HomePage.module.css";
import { useDispatch } from "react-redux";
import { getPokemons } from "../../redux/actions";
import Cards from "../../components/cards/Cards";

const HomePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPokemons());
    },[dispatch])

    return(
        <div className={styles.homeContainer}>
        <h1>Esto es Home</h1>
        <Cards />
        </div>
    )
}

export default HomePage;