const deletePokemon = require("../controllers/deleteController");

const deletePokemonHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deletePokemon(id);

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

module.exports = deletePokemonHandler;