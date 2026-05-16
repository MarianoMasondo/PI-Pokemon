import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./DetailPage.module.css";
import { getPokemonDetail } from "../../redux/actions";

const DetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const pokemonDetail = useSelector((state) => state.pokemonDetail);

  useEffect(() => {
    dispatch(getPokemonDetail(id));
  }, [dispatch, id]);

  const handleCloseDetail = () => {
    history.push("/home");
  };

  const capitalizeFirstLetter = (text) => {
    if (!text || typeof text !== "string") return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const normalizeTypes = () => {
    if (!pokemonDetail?.type) return [];

    if (Array.isArray(pokemonDetail.type)) {
      return pokemonDetail.type
        .map((type) => {
          if (typeof type === "string") return type;
          if (type?.name) return type.name;
          return "";
        })
        .filter(Boolean);
    }

    return [];
  };

  const pokemonTypes = normalizeTypes();
  const firstType = pokemonTypes[0]?.toLowerCase();

  const typeColors = {
    grass: "#7ac74c",
    fire: "#ee8130",
    water: "#6390f0",
    electric: "#f7d02c",
    poison: "#a33ea1",
    flying: "#a98ff3",
    bug: "#a6b91a",
    normal: "#a8a77a",
    ground: "#e2bf65",
    fairy: "#d685ad",
    fighting: "#c22e28",
    psychic: "#f95587",
    rock: "#b6a136",
    ghost: "#735797",
    ice: "#96d9d6",
    dragon: "#6f35fc",
    dark: "#705746",
    steel: "#b7b7ce",
  };

  const detailColor = typeColors[firstType] || "#facc15";

  if (!pokemonDetail || !pokemonDetail.name) {
    return (
      <main className={styles.detailContainer}>
        <section className={styles.loadingCard}>
          <div className={styles.loader}></div>
          <p>Cargando Pokémon...</p>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.detailContainer}>
      <section
        className={styles.detailCard}
        style={{ "--detail-color": detailColor }}
      >
        <button className={styles.closeButton} onClick={handleCloseDetail}>
          Close
        </button>

        <div className={styles.cardHeader}>
          <span className={styles.idBadge}>#{pokemonDetail.id}</span>

          <div>
            <p className={styles.subtitle}>Pokémon detail</p>
            <h1>{capitalizeFirstLetter(pokemonDetail.name)}</h1>
          </div>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.imageBox}>
            <img
              src={pokemonDetail.image}
              alt={pokemonDetail.name}
              className={styles.image}
            />
          </div>

          <div className={styles.infoBox}>
            <h2>Characteristics</h2>

            <div className={styles.typesBox}>
              {pokemonTypes.length > 0 ? (
                pokemonTypes.map((type) => (
                  <span key={type} className={styles.typeBadge}>
                    {capitalizeFirstLetter(type)}
                  </span>
                ))
              ) : (
                <span className={styles.typeBadge}>Sin tipo</span>
              )}
            </div>

            <div className={styles.statsGrid}>
              <article className={styles.statItem}>
                <span>HP</span>
                <strong>{pokemonDetail.hp || "?"}</strong>
              </article>

              <article className={styles.statItem}>
                <span>Attack</span>
                <strong>{pokemonDetail.attack || "?"}</strong>
              </article>

              <article className={styles.statItem}>
                <span>Defense</span>
                <strong>{pokemonDetail.defense || "?"}</strong>
              </article>

              <article className={styles.statItem}>
                <span>Speed</span>
                <strong>{pokemonDetail.speed || "?"}</strong>
              </article>

              <article className={styles.statItem}>
                <span>Height</span>
                <strong>{pokemonDetail.height || "?"}</strong>
              </article>

              <article className={styles.statItem}>
                <span>Weight</span>
                <strong>{pokemonDetail.weight || "?"}</strong>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DetailPage;