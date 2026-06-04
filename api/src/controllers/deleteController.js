const { Pokemon } = require("../db");

const deletePokemon = async (id) => {
  const pokemon = await Pokemon.findByPk(id);

  if (!pokemon) {
    throw new Error("Pokémon no encontrado en la base de datos.");
  }

  if (!pokemon.createDb) {
    throw new Error(
      "Solamente se pueden eliminar Pokémon creados por el usuario."
    );
  }

  await pokemon.setTypes([]);
  await pokemon.destroy();

  return {
    message: "Pokémon eliminado correctamente.",
  };
};

module.exports = deletePokemon;