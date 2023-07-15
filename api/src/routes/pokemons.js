const { Router } = require("express");

const pokemonsRouter = Router();

pokemonsRouter.get("/");
pokemonsRouter.get("/:id");
pokemonsRouter.get("/name");
pokemonsRouter.post("/")


module.exports = pokemonsRouter;