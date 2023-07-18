const { Pokemon, Type } = require("../db");

const createPokemons = async ({
  id,
  name,
  types,
  hp,
  attack,
  defense,
  speed,
  height,
  weight,
  image,
}) => {
  const newPokemon = await Pokemon.create({
    id,
    name,
    types,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    image,
  });

  const addType = await Type.findAll({
    where: {
      name: types,
    },
  });

  await newType.addType(addType);

  const pokemonRelation = await Pokemon.findOne({
    where: {
      id: newPokemon.id,
    },
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

  return pokemonRelation;
};
//         catch(error){
//             throw Error({message: "No se pudo encontrar pokemon"})
//         }
// }
module.exports = createPokemons;
