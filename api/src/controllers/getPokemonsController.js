// const axios = require("axios");
// const { Pokemon, Type } = require("../db");
// const pageNum = 4

// const allPokemons = async () => {

//     let response = [];
//     let allResponse = [];

//     for(let i = 1; i < pageNum; i++){
//         response = await Promise.all([...response, await axios.get(`https://pokeapi.co/api/v2/pokemon`)])
//     }
//     response.forEach(element => {
//         allResponse = allResponse.concat(element.data.results)
//     })

//     const pokemonsData = allResponse.map(
//     ({ 
//         id,
//         name,
//         image,
//         hp,
//         attack,
//         defense,
//         speed,
//         height,
//         weight,
//         Type
//     }) => ({
//         id: id,
//         name: name,
//         image: image,
//         hp: hp,
//         attack: attack,
//         defense: defense,
//         speed: speed,
//         height: height,
//         weight: weight,
//         Type: Type

//     })
//     )

//     const dbData = await Pokemon.findAll({
//         include:[{
//             model: Type,
//             attributes: ["name"],
//             through: {
//                 attributes: []
//             }
//         }]
//     })
//     const dbDataPokemons = dbData.map(({
//         id,
//         name,
//         image,
//         hp,
//         attack,
//         defense,
//         speed,
//         height,
//         weight,
//         Type
//     }) => ({
//         id: id,
//         name: name,
//         image: image,
//         hp: hp,
//         attack: attack,
//         defense: defense,
//         speed: speed,
//         height: height,
//         weight: weight,
//         Type: Type
//     }))
    

//     const allData = [...pokemonsData, ... dbDataPokemons];
//     return allData;
// }
// module.exports = allPokemons;
const axios = require('axios');
const { Pokemon, Type } = require('../db');

const pageNum = 4;

const allPokemons = async () => {
  const pokemonsFromApi = await fetchPokemonsFromApi();
  const dbDataPokemons = await fetchPokemonsFromDatabase();

  const allData = [...pokemonsFromApi, ...dbDataPokemons];
  return allData;
};

const fetchPokemonsFromApi = async () => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${pageNum * 20}`);
  const results = response.data.results;

  const pokemonsFromApi = await Promise.all(results.map(async (pokemon) => {
    const pokemonGet = await axios.get(pokemon.url);
    const pokemonData = pokemonGet.data;

    const pokemonObj = {
      id: pokemonData.id,
      name: pokemonData.name,
      image: pokemonData.sprites.front_default,
      hp: pokemonData.stats.find((elem) => elem.stat.name === 'hp').base_stat,
      attack: pokemonData.stats.find((elem) => elem.stat.name === 'attack').base_stat,
      defense: pokemonData.stats.find((elem) => elem.stat.name === 'defense').base_stat,
      speed: pokemonData.stats.find((elem) => elem.stat.name === 'speed').base_stat,
      height: pokemonData.height,
      weight: pokemonData.weight,
      type: pokemonData.types.map((elem) => elem.type.name),
    };

    return pokemonObj;
  }));

  return pokemonsFromApi;
};

const fetchPokemonsFromDatabase = async () => {
  const dbData = await Pokemon.findAll({
    include: [
      {
        model: Type,
        attributes: ['name'],
        through: {
          attributes: []
        }
      }
    ]
  });

  const dbDataPokemons = dbData.map(({
    id,
    name,
    image,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    Type
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
    Type: Type
  }));

  return dbDataPokemons;
};

module.exports = allPokemons;




















