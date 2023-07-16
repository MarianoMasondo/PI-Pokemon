const { Router } = require("express");

const pokemonsRoutes = Router();

pokemonsRoutes.get("/");
pokemonsRoutes.get("/:id");
pokemonsRoutes.get("/name");
pokemonsRoutes.post("/")


module.exports = pokemonsRoutes;