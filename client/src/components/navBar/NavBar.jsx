import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <div className={styles.leftButtons}>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? `${styles.navButton} ${styles.active}` : styles.navButton
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/create"
            className={({ isActive }) =>
              isActive ? `${styles.navButton} ${styles.active}` : styles.navButton
            }
          >
            Create
          </NavLink>
        </div>

        <NavLink to="/home" className={styles.logoBox}>
          <span className={styles.pokeball}>◉</span>
          <div>
            <h1>Pokémon App</h1>
            <p>Proyecto Individual </p>
          </div>
        </NavLink>

        <div className={styles.searchBox}>
          <SearchBar />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;