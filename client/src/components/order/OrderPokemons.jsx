import React, { useEffect, useState } from "react";
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
        } else if (e.target.value === "asc") {
          dispatch(orderAttack("highest")); // Utilizar "highest" para ordenar de mayor a menor el atributo "attack"
        } else if (e.target.value === "desc") {
          dispatch(orderAttack("lowest")); // Utilizar "lowest" para ordenar de menor a mayor el atributo "attack"
        }
        setAux(!aux);
      };
    return (
        <div className={styles.orderContainer}>
            <div className={`${styles.orderAscDesc}`}>
                <select onChange={(e) => handleOrderAscDesc(e)}>
                    <option value="default">Order alphabetically</option>
                    <option value="asc">Ascendent</option>
                    <option value="desc">Descendent</option>
                </select>
            </div>
            <div className={`${styles.orderByAttack}`}>
                <select onChange={(e) => handleOrderAttack(e)}>
                    <option value="default">Search by attack</option>
                    <option value="asc">Weakest</option>
                    <option value="desc">Strongest</option>
                </select>
            </div>
        </div>
    )
}
export default OrderPokemons;