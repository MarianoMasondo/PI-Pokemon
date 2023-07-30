import React from "react";
import { Link } from "react-router-dom"
import style from "./NavBar.module.css"
import OrderPokemons from "../order/OrderPokemons";
import TypeFilter from "../filter/Filter";
import SearchBar from "../searchBar/SearchBar";


const NavBar = () => {
    return(
        <div className={style.navContainer}>
            <SearchBar />
            <OrderPokemons />
            <TypeFilter />
            <Link to = "/home">Home</Link>
            <Link to = "/create">Form</Link>
        </div>
    )
}

export default NavBar;