import { useEffect, useState } from "react";
import { getPokemons, orderAttack, orderPokemons } from "../../redux/actions";
import styles from "./OrderPokemons.module.css";
import { useDispatch } from "react-redux";

const OrderPokemons = () => {
    const dispatch = useDispatch();
    const [aux, setAux] = useState(false);

    useEffect(() => {
        dispatch(getPokemons());
      }, [dispatch]);
    const handleOrderAscDesc = (e) => {
        e.preventDefault();
        if (e.target.value === "default") {
          dispatch(getPokemons()); // Restablecer el orden original llamando a la acción correspondiente
        } else {
          dispatch(orderPokemons(e.target.value));
        }
        setAux(!aux);
      };
    
      const handleOrderAttack = (e) => {
        e.preventDefault();
        if (e.target.value === "default") {
          dispatch(getPokemons()); // Restablecer el orden original llamando a la acción correspondiente
        } else {
          dispatch(orderAttack(e.target.value));
        }
        setAux(!aux);
      };
    return (
        <div>
            <div className={`${styles.orderAscDesc}`}>
                <select onChange={(e) => handleOrderAscDesc(e)}>
                    <option value="default">Order alphabetically</option>
                    <option value="asc">Ascendent</option>
                    <option value="desc">Descendent</option>
                </select>
            </div>
            <div className={`${styles.orderByAttack}`}>
                <select onChange={(e) => handleOrderAttack(e)}>
                    <option value="default">Sort by attack</option>
                    <option value="asc">Powerfull</option>
                    <option value="desc">Weakest</option>
                </select>
            </div>
        </div>
    )
}
export default OrderPokemons;