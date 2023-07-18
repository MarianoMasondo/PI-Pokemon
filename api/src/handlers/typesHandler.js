const allTypes = require("../controllers/typesController");

const getAllTypes = async (req, res) => {
  try {
    const types = await allTypes();
    res.status(200).json(types);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = getAllTypes;
