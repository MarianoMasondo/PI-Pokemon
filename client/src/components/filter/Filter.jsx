import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allTypes,
  filterApiDb,
  filterType,
  getPokemons,
} from "../../redux/actions";
import styles from "./Filter.module.css";

const TypeFilter = () => {
  const [selectedType, setSelectedType] = useState("");
  const [selectedSource, setSelectedSource] = useState("all");

  const types = useSelector((state) => state.types);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allTypes());
  }, [dispatch]);

  const handleFilter = (e) => {
    const selectedValue = e.target.value;
    setSelectedType(selectedValue);

    if (selectedValue === "default") {
      dispatch(getPokemons());
    } else {
      dispatch(filterType(selectedValue));
    }
  };

  const handleSourceFilter = (e) => {
    const selectedValue = e.target.value;
    setSelectedSource(selectedValue);
    dispatch(filterApiDb(selectedValue));
  };

  return (
    <div className={styles.filterContainer}>
      <select
        className={styles.select}
        onChange={handleFilter}
        value={selectedType}
      >
        <option value="default">Todos los tipos</option>

        {types?.map((type) => (
          <option key={type.id || type.name} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>

      <div className={styles.sourceBox}>
        <span>Origen</span>

        <label
          className={`${styles.radioPill} ${
            selectedSource === "all" ? styles.active : ""
          }`}
        >
          <input
            type="radio"
            value="all"
            checked={selectedSource === "all"}
            onChange={handleSourceFilter}
          />
          Todos
        </label>

        <label
          className={`${styles.radioPill} ${
            selectedSource === "api" ? styles.active : ""
          }`}
        >
          <input
            type="radio"
            value="api"
            checked={selectedSource === "api"}
            onChange={handleSourceFilter}
          />
          API
        </label>

        <label
          className={`${styles.radioPill} ${
            selectedSource === "database" ? styles.active : ""
          }`}
        >
          <input
            type="radio"
            value="database"
            checked={selectedSource === "database"}
            onChange={handleSourceFilter}
          />
          DB
        </label>
      </div>
    </div>
  );
};

export default TypeFilter;