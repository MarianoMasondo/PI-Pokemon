import { Link } from "react-router-dom"
import style from "./NavBar.module.css"
import { SearchBar } from "../searchBar/SearchBar";
import OrderPokemons from "../order/OrderPokemons";

const NavBar = () => {
    return(
        <div className={style.navContainer}>
            <SearchBar />
            <OrderPokemons />
            <Link to = "/home">Home</Link>
            <Link to = "/create">Form</Link>
        </div>
    )
}

export default NavBar;