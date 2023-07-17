const nameDataPokemons = require("../controllers/nameController");

const  getPokemonsName = async(req, res) => {
    const { name } = req.query;
    const nameLower = name.toLowerCase();
    try {
        const pokemons = await nameDataPokemons(nameLower);
        res.status(200).json(pokemons);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}
module.exports = getPokemonsName