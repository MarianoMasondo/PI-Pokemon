import { NavLink } from "react-router-dom";
import styles from "./Card.module.css"

const Card = ({name, image, types, id}) => {
    
    return(
        <div className={styles.cardContainer }>
            <NavLink to={`/detail/${id}`} style={{ textDecoration: "none" } }>
                <div className={styles.card_box}>
            <img src={image} alt="" />
            <h1>{name}</h1>
            <h3>{ types }</h3>
                </div>
            </NavLink>
        </div>
    )
}

export default Card;