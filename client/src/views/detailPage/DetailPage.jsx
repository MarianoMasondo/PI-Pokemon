import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./DetailPage.module.css";
import { getPokemonDetail } from "../../redux/actions";

const DetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pokemonDetail = useSelector((state) => state.pokemonDetail);
  const history = useHistory(); // Obtener el objeto de historial de navegación

  useEffect(() => {
    dispatch(getPokemonDetail(id));
  }, [dispatch, id]);

  // Estado local para controlar si el DetailPage está abierto o cerrado
  const [isDetailOpen, setIsDetailOpen] = useState(true);

  // Función para cerrar el DetailPage y redirigir a Home al hacer clic en el botón
  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    // Redirigir a la página de inicio (Home)
    history.push("/home");
  };

  // Función para convertir la primera letra en mayúscula
  const capitalizeFirstLetter = (string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
  };
  

  // Si el DetailPage está cerrado, redirigimos a la página de inicio (Home)
  if (!isDetailOpen) {
    return <Link to="/home">Ir a Home</Link>;
  }

  return (
    <div className={styles.detailContainer}>
      <div className={styles.card}>
        <button onClick={handleCloseDetail}>Close</button>
        {/* <h1>Esto es Detail</h1> */}
        <h1 className={styles.h1}>{capitalizeFirstLetter(pokemonDetail.name)}</h1>
        <div>
          <img src={pokemonDetail.image} className={styles.image} alt="" />
        </div>
          <h3 className={styles.h3characteristics}>Characteristics:</h3>
        <div className={styles.characteristics}>
        <div className={`${styles.leftColumn} ${styles.column}`}>
    <p>HP: {pokemonDetail.hp}</p>
    <p>Attack: {pokemonDetail.attack}</p>
    <p>Defense: {pokemonDetail.defense}</p>
    <p>Speed: {pokemonDetail.speed}</p>
  </div>
  <div className={`${styles.rightColumn} ${styles.column}`}>
    <p>Height: {pokemonDetail.height}</p>
    <p>Weight: {pokemonDetail.weight}</p>
    <p>Types: {pokemonDetail.type && pokemonDetail.type.join(", ")}</p>
    <p>ID: {pokemonDetail.id}</p>
  </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;



