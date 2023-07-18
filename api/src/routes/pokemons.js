const { Router } = require("express");
const getPokemonsName = require("../handlers/nameHandler");
const getIdPokemons = require("../handlers/idHandler");
const getAllPokemons = require("../handlers/getPokemonsHandler");
const createNewPokemon = require("../handlers/createHandler");

const pokemonsRoutes = Router();

pokemonsRoutes.get("/", getAllPokemons);
pokemonsRoutes.get("/name", getPokemonsName);
pokemonsRoutes.get("/:id", getIdPokemons);
pokemonsRoutes.post("/", createNewPokemon);

module.exports = pokemonsRoutes;
