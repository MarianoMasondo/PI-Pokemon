const axios = require("axios");
const { Pokemon, Type } = require("../db");
const pageNum = 5;

const allPokemons = async () => {
  let response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=${pageNum * 20}`
  );

  let results = response.data.results;

  const pokemonsData = await Promise.all(
    results.map(async ({ url }) => {
      let response = await axios.get(url);
      let pokemonData = response.data;
      return {
        id: pokemonData.id,
        name: pokemonData.name,
        image: pokemonData.sprites.front_default,
        hp: pokemonData.stats[0].base_stat,
        attack: pokemonData.stats[1].base_stat,
        defense: pokemonData.stats[2].base_stat,
        speed: pokemonData.stats[5].base_stat,
        height: pokemonData.height,
        weight: pokemonData.weight,
        types: pokemonData.types.map((type) => type.type.name),
      };
    })
  );

  const dbData = await Pokemon.findAll({
    include: [
      {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  const dbDataPokemons = dbData.map(
    ({
      id,
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      Type,
    }) => ({
      id: id,
      name: name,
      image: image,
      hp: hp,
      attack: attack,
      defense: defense,
      speed: speed,
      height: height,
      weight: weight,
      Type: Type,
    })
  );

  const allData = [...pokemonsData, ...dbDataPokemons];
  return allData;
};
module.exports = allPokemons;
