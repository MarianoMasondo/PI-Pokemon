const axios = require("axios");
const { Pokemon, Type } = require("../db");

const idDataPokemon = async (id) => {
  if (id.length < 5) {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = response.data;

    const idData = {
      id: data.id,
      name: data.name,
      image: data.sprites.other["home"].front_default,
      hp: data.stats.find((element) => element.stat.name === "hp").base_stat,
      attack: data.stats.find((element) => element.stat.name === "attack")
        .base_stat,
      defense: data.stats.find((element) => element.stat.name === "defense")
        .base_stat,
      speed: data.stats.find((element) => element.stat.name === "speed")
        .base_stat,
      height: data.height,
      weight: data.weight,
      type: data.types.map((element) => element.type.name),
    };
    return idData;
  } else {
    searchDbId = await Pokemon?.findByPk(id, {
      include: {
        model: Type,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    return searchDbId;
  }
};
module.exports = idDataPokemon;
