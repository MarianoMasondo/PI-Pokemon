const idDataPokemon = require("../controllers/idController");

const getIdPokemons = async (req, res) => {
    const {id} = req.params;
    try{
        const pokemonsData = await idDataPokemon(id)
        res.status(200).json(pokemonsData)
    } catch (error){
        res.status(404).json({error: error.message})
    }
}
module.exports = getIdPokemons;