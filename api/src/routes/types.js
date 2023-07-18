const { Router } = require("express");
const getAllTypes = require("../handlers/typesHandler");

const typesRoutes = Router();

typesRoutes.get("/", getAllTypes);

module.exports = typesRoutes;
