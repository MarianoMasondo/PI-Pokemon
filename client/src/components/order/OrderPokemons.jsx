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
      dispatch(getPokemons());
    } else {
      dispatch(orderPokemons(e.target.value));
    }

    setAux(!aux);
  };

  const handleOrderAttack = (e) => {
    e.preventDefault();

    if (e.target.value === "default") {
      dispatch(getPokemons());
    } else if (e.target.value === "asc") {
      dispatch(orderAttack("highest"));
    } else if (e.target.value === "desc") {
      dispatch(orderAttack("lowest"));
    }

    setAux(!aux);
  };

  return (
    <div className={styles.orderContainer}>
      <select className={styles.select} onChange={handleOrderAscDesc}>
        <option value="default">Orden alfabético</option>
        <option value="asc">A - Z</option>
        <option value="desc">Z - A</option>
      </select>

      <select className={styles.select} onChange={handleOrderAttack}>
        <option value="default">Orden por ataque</option>
        <option value="asc">Menor ataque</option>
        <option value="desc">Mayor ataque</option>
      </select>
    </div>
  );
};

export default OrderPokemons;