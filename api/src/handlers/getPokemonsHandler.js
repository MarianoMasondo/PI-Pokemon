const allPokemons = require("../controllers/getPokemonsController");

const getAllPokemons = async (req, res) => {
  try {
    const pokemons = await allPokemons();
    res.status(200).json(pokemons);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = getAllPokemons;
