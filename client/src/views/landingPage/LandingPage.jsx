import React from "react";
import { Link } from "react-router-dom";
import styles from"./LandingPage.module.css";


const LandingPage = () => {
    return(
        <div className={styles.landingContainer}>
        <h1>Esto es Landing</h1>
        <Link to = "/home">
            <button type="submit">Enter</button>
        </Link>
        </div>
    )
}

export default LandingPage;