const axios = require("axios");
const { pokemons, types} = require("../db")
const { Op } = require("sequelize")

const nameDataPokemons = async (name) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        const apiData = response.data.results.map(
            ({
                id,
                name,
                types,
                hp,
                attack,
                defense,
                speed,
                height,
                weight,
                image
            }) => ({
                id: id,
                name: name,
                types: types.map(element => element.name),
                hp: hp,
                attack: attack,
                defense: defense,
                speed: speed,
                height: height,
                weight: weight,
                image
            }));

            const dbData = await pokemons.findAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%`,
                    },
                },
                include: [{
                    model: types,
                    attributes: ["name"],
                    through: {
                        attributes: []
                    } 
                }],
                limit: 12,
            })
            
            const dbDataPokemons = dbData.map(({
                id,
                name,
                type,
                hp,
                attack,
                defense,
                speed,
                height,
                weight,
                image
            }) => ({
                id: id,
                name: name,
                type: type,
                hp: hp,
                attack: attack,
                defense: defense,
                speed: speed,
                height: height,
                weight: weight,
                image
            }))

        if(apiData.length === 0 && dbDataPokemons === 0){
            return {message: "No seencontraron pokemons con este nombre"}
        } 

        const allData = [apiData, dbData];
        return allData;

    } catch (error){
        return {message: "Error al buscar los Pokemons"}
    }
}
module.exports = nameDataPokemons;