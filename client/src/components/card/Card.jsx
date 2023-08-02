import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Card.module.css";

const Card = ({ name, image, types, id, attack }) => {
  const capitalize = (str) => {
    if (typeof str !== "string" || str.length === 0) {
      return "";
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const capitalizedTypes =
    Array.isArray(types) && types.length > 0
      ? types.map((type) => capitalize(type))
      : [];

  return (
    <div className={styles.cardContainer}>
      <NavLink to={`/detail/${id}`} style={{ textDecoration: "none" }}>
        <div className={styles.card_box}>
          <h1>{capitalize(name)}</h1>
          <img className={styles.cardImage} src={image} alt="" />
          <h3>{capitalizedTypes.join(", ")}</h3> {/* Render types */}
          <p>{attack}</p>
        </div>
      </NavLink>
    </div>
  );
};

export default Card;
