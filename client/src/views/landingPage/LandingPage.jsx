import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <main className={styles.landingContainer}>
      <div className={styles.pokeballContainer}>
        <NavLink to="/home" className={styles.pokeball}>
          <div className={styles.pokeballButton}>
            <span>Enter</span>
          </div>
        </NavLink>
      </div>
    </main>
  );
};

export default LandingPage;