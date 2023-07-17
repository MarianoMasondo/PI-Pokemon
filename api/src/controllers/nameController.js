const axios = require("axios");
const { Pokemon, Type} = require("../db")
const { Op } = require("sequelize")

const nameDataPokemons = async (name) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const apiData = {
          id: response.data.id,
          name: response.data.name,
          type: response.data.types.map((el) => el.type.name),
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          speed: response.data.stats[3].base_stat,
          height: response.data.height,
          weight: response.data.weight,
          image: response.data.sprites.other['official-artwork'].front_default,
        };       

            const dbData = await Pokemon.findAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%`,
                    },
                },
                include: [{
                    model: Type,
                    attributes: ["name"],
                    through: {
                        attributes: []
                    } 
                }],
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
        console.log(error);
        return {message: "Error al buscar los Pokemons"}
    }
}
module.exports = nameDataPokemons;