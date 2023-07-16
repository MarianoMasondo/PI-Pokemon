const axios = require("axios");
const { Pokemon, Type } = require("../db");

const allPokemons = async () => {

    const URL = `https://pokeapi.co/api/v2/pokemon`;

    let response = await axios.get(URL);
    let allResponse = [];

    const pokemonsData = allResponse.map(
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

    })
    )
}
module.exports = allPokemons;



















