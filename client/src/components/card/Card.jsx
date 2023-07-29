import { NavLink } from "react-router-dom";
import styles from "./Card.module.css"

const Card = ({name, image, types, id, attack}) => {

    const capitalize = (str) => {
        if (typeof str !== "string" || str.length === 0) {
          return "";
        }
      
        return str.charAt(0).toUpperCase() + str.slice(1);
      };
      
    
    return(
        <div className={styles.cardContainer }>
            <NavLink to={`/detail/${id}`} style={{ textDecoration: "none" } }>
                <div className={styles.card_box}>
            <h1>{capitalize(name)}</h1>
            <img src={image} alt="" />
            <h3>{ capitalize (types && types.join(", ")) }</h3>
            {attack}
                </div>
            </NavLink>
        </div>
    )
}

export default Card;