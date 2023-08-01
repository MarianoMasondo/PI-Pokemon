// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { allTypes, filterApiDb, filterType } from "../../redux/actions";
// import styles from "./Filter.module.css";

// const TypeFilter = () => {
//   const [selectedType, setSelectedType] = useState("");
//   const types = useSelector((state) => state.types);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(allTypes());
//   }, [dispatch]);
  
//   const handleFilter = (e) => {
//     setSelectedType(e.target.value);
//     dispatch(filterType(e.target.value));
//   };

//   const handleSourceFilter = (e) => {
//     setSelectedType(e.target.value);
//     dispatch(filterApiDb(e.target.value));
//   };
 
//   return (
//     <div>
//       <div className={styles.filterContainer}>
//         <select onChange={(e) => handleFilter(e)} value="default">
//           <option value="default">Filter by type</option>
//           {types?.map((type) => (
//             <option key={type.id} value={type.name}>
//               {type.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className={styles.filterContainerInput}>
//         <span>Filter by source:</span>
//         <label>
//           <input
//             type="radio"
//             value="all"
//             checked={selectedType === "all"}
//             onChange={handleSourceFilter}
//           />
//           All
//         </label>
//         <label>
//           <input
//             type="radio"
//             value="api"
//             checked={selectedType === "api"}
//             onChange={handleSourceFilter}
//           />
//           API
//         </label>
//         <label>
//           <input
//             type="radio"
//             value="database"
//             checked={selectedType === "database"}
//             onChange={handleSourceFilter}
//           />
//           Database
//         </label>
//       </div>
//     </div>
//   );
// };

// export default TypeFilter;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allTypes, filterApiDb, filterType } from "../../redux/actions";
import styles from "./Filter.module.css";

const TypeFilter = () => {
  const [selectedType, setSelectedType] = useState("");
  const types = useSelector((state) => state.types);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allTypes());
  }, [dispatch]);

  const handleFilter = (e) => {
    const selectedValue = e.target.value;
    setSelectedType(selectedValue);
    if (selectedValue === "default") {
      // Reset the value to the default option ("Filter by type")
      setSelectedType("");
      dispatch(filterType("")); // Assuming you need to dispatch this action
    } else {
      dispatch(filterType(selectedValue));
    }
  };

  const handleSourceFilter = (e) => {
    setSelectedType(e.target.value);
    dispatch(filterApiDb(e.target.value));
  };

  return (
    <div>
      <div className={styles.filterContainer}>
        <select onChange={(e) => handleFilter(e)} value={selectedType}>
          <option value="default">Filter by type</option>
          {types?.map((type) => (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterContainerInput}>
        <span>Filter by source:</span>
        <label>
          <input
            type="radio"
            value="all"
            checked={selectedType === "all"}
            onChange={handleSourceFilter}
          />
          All
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
            value="database"
            checked={selectedType === "database"}
            onChange={handleSourceFilter}
          />
          Database
        </label>
      </div>
    </div>

  );
};

export default TypeFilter;

