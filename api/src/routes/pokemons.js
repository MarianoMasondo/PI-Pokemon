const { Router } = require("express");
const getPokemonsName = require("../handlers/nameHandler");
const getIdPokemons = require("../handlers/idHandler");
const getAllPokemons = require("../handlers/getPokemonsHandler");

const pokemonsRoutes = Router();

pokemonsRoutes.get("/", getAllPokemons);
pokemonsRoutes.get("/:id", getIdPokemons);
pokemonsRoutes.get("/name", getPokemonsName);
pokemonsRoutes.post("/")

module.exports = pokemonsRoutes;