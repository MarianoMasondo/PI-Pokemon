const { Router } = require("express");
const getPokemonsName = require("../handlers/nameHandler");
const getIdPokemons = require("../handlers/idHandler");
const getAllPokemons = require("../handlers/getPokemonsHandler");
const createNewPokemon = require("../handlers/createHandler");
const deletePokemonHandler = require("../handlers/deleteHandler");

const pokemonsRoutes = Router();

pokemonsRoutes.get("/", getAllPokemons);
pokemonsRoutes.get("/name", getPokemonsName);
pokemonsRoutes.get("/:id", getIdPokemons);
pokemonsRoutes.post("/", createNewPokemon);
pokemonsRoutes.delete("/:id", deletePokemonHandler);

module.exports = pokemonsRoutes;