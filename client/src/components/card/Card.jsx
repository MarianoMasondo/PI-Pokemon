import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Card.module.css";

const Card = ({ name, image, types, id, attack }) => {
  const capitalize = (text) => {
    if (!text || typeof text !== "string") return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const normalizeTypes = () => {
    if (!Array.isArray(types)) return [];

    return types
      .map((type) => {
        if (typeof type === "string") return type;
        if (type?.name) return type.name;
        return "";
      })
      .filter(Boolean);
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

  const cardColor = typeColors[firstType] || "#facc15";

  return (
    <div className={styles.container}>
      <NavLink
        to={`/detail/${id}`}
        className={styles.cardLink}
        style={{ "--type-color": cardColor }}
      >
        <div className={styles.card_box}>
          <div className={styles.imageBox}>
            <img src={image} alt={name} />
          </div>

          <div className={styles.infoBox}>
            <h1>{capitalize(name)}</h1>

            <div className={styles.typesBox}>
              {pokemonTypes.length > 0 ? (
                pokemonTypes.map((type) => (
                  <span key={type} className={styles.typeBadge}>
                    {capitalize(type)}
                  </span>
                ))
              ) : (
                <span className={styles.typeBadge}>Sin tipo</span>
              )}
            </div>

            <p className={styles.attack}>Ataque: {attack}</p>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default Card;