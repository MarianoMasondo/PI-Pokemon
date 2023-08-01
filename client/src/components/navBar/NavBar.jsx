import React from "react";
import { Link } from "react-router-dom"
import styles from "./NavBar.module.css"
import SearchBar from "../searchBar/SearchBar";

const NavBar = () => {
    return(
        <div className={styles.navBarContainer}>
            <div className={styles.navButtons}>
              <Link to="/home"><button >Home</button></Link>
              <Link to="/create"><button>Create</button></Link>
            </div>
            <div className={styles.logoContainer}>
                <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/269px-International_Pok%C3%A9mon_logo.svg.png"} alt="Logo Pokemon" className={styles.logoImage} />
            </div>
            <div className={styles.searchBarContainer}>
            <SearchBar />
            </div>

        </div>
    )
}

export default NavBar;