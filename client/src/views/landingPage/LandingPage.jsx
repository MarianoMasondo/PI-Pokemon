// import React from "react";
// import { Link } from "react-router-dom";
// import styles from "./LandingPage.module.css";

// const LandingPage = () => {
//   return (
//     <div className={styles.landingContainer}>
//       <h1><a href="https://fontmeme.com/fuentes/fuente-pokmon/"><img src="https://fontmeme.com/permalink/230731/93b166417d862b325e514f2c136a177b.png" alt="fuente-pokmon" border="0"></a></h1>
//       <Link to="/home">
//         <div className={styles.pokeball}>
//           <button className={`${styles.pokeball__button} centered-text`} type="submit">
//             <span>Enter</span>
//           </button>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default LandingPage;
import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={styles.landingContainer}>
      <h1><a href="https://fontmeme.com/es/doblar-imagenes/"><img src="https://fontmeme.com/permalink/230731/f83fdfdb2482b4c1f7620adc769b5f00.png" alt="doblar-imagenes" border="0" /></a></h1>
      <Link to="/home">
        <div className={styles.pokeball}>
          <button className={`${styles.pokeball__button} centered-text`} type="submit">
            <span>Enter</span>
          </button>
        </div>
      </Link>
    </div>
  );
};

export default LandingPage;
