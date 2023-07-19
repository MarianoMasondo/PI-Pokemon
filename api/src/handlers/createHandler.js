const createPokemons = require("../controllers/createController");

const createNewPokemon = async (req, res) => {
  const { name, types, hp, attack, defense, speed, height, weight, image } =
    req.body;
    
  if (
    !name ||
    !types ||
    !hp ||
    !attack ||
    !defense ||
    !speed ||
    !height ||
    !weight ||
    !image
  ) {
    return res.status(400).json({
      error: "Todos los campos obligatorios deben ser proporcionados.",
    });
  }

  try {
    const postPokemon = await createPokemons({
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
    res.status(200).json(postPokemon);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = createNewPokemon;
