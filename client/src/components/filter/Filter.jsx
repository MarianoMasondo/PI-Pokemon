import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allTypes, filterApiDb, filterType } from "../../redux/actions";
import styles from "./Filter.module.css";

const TypeFilter = (props) => {
  const [selectedType, setSelectedType] = useState("");
  const [aux, setAux] = useState(false);
  const types = useSelector((state) => state.types);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allTypes());
  }, [dispatch]);

  const handleFilter = (e) => {
    setSelectedType(e.target.value);
    dispatch(filterType(e.target.value));
    setAux(!aux);
    // props.setCurrentPage(1);
  };

  const handleSourceFilter = (e) => {
    setSelectedType(e.target.value);
    dispatch(filterApiDb(e.target.value));
  };

  return (
    <div>
      <div className={styles.filterContainer}>
        <select onChange={(e) => handleFilter(e)} value={selectedType}>
          <option value="default">Filtro por Tipo</option>
          {types?.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterContainerInput}>
        <span>Filtrar por origen:</span>
        <label>
          <input
            type="radio"
            value="all"
            checked={selectedType === "all"}
            onChange={handleSourceFilter}
          />
          Todos
        </label>
        <label>
          <input
            type="radio"
            value="api"
            checked={selectedType === "api"}
            onChange={handleSourceFilter}
          />
          API
        </label>
        <label>
          <input
            type="radio"
            value="dataBase"
            checked={selectedType === "dataBase"}
            onChange={handleSourceFilter}
          />
          Base de Datos
        </label>
      </div>
    </div>
  );
};

export default TypeFilter;
