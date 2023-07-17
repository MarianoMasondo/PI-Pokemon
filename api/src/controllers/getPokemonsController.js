const axios = require("axios");
const { Pokemon, Type } = require("../db");
const pageNum = 4

const allPokemons = async () => {

    let response = [];
    let allResponse = [];

    for(let i = 1; i < pageNum; i++){
        response = await Promise.all([...response, await axios.get(`https://pokeapi.co/api/v2/pokemon`)])
    }
    response.forEach(element => {
        allResponse = allResponse.concat(element.data.results)
    })

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

    const dbData = await Pokemon.findAll({
        include:[{
            model: Type,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }]
    })
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
    }))
    

    const allData = [...pokemonsData, ... dbDataPokemons];
    return allData;
}
module.exports = allPokemons;



















