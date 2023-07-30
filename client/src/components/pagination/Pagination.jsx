import React from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ currentPage, pokemonsPerPage, allPokemons, paginate }) => {
  const totalPages = Math.ceil(allPokemons.length / pokemonsPerPage);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav className={styles.paginationContainer}>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => paginate(page)}
          className={currentPage === page ? styles.active : ""}
        >
          {page}
        </button>
      ))}
    </nav>
  );
};

export default Pagination;
