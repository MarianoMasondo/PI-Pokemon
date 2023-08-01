import React from "react";
import { Link } from "react-router-dom"
import styles from "./NavBar.module.css"
import OrderPokemons from "../order/OrderPokemons";
import TypeFilter from "../filter/Filter";
import SearchBar from "../searchBar/SearchBar";

const NavBar = () => {
    return(
        <div className={styles.navBarContainer}>
            <SearchBar />
            <OrderPokemons />
            <TypeFilter />
            <div className={styles.navButtons}>
              <Link to="/home"><button>Home</button></Link>
              <Link to="/create"><button>Create</button></Link>
            </div>
        </div>
    )
}

export default NavBar;