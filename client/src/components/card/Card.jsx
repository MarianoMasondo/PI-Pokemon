import { NavLink } from "react-router-dom";
import styles from "./Card.module.css"

const Card = ({name, image, types, id}) => {

    function capitalize(name) {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }
    
    return(
        <div className={styles.cardContainer }>
            <NavLink to={`/detail/${id}`} style={{ textDecoration: "none" } }>
                <div className={styles.card_box}>
            <h1>{capitalize(name)}</h1>
            <img src={image} alt="" />
            <h3>{ capitalize (types && types.join(", ")) }</h3>
                </div>
            </NavLink>
        </div>
    )
}

export default Card;