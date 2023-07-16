const axios = require("axios");
const { Type } = require("../db");

const allTypes = async () => {
    const response = await axios.get(`https://pokeapi.co/api/v2/type`)
    const data = response.data.results;
    const nameTypes = data.map(n => n.name);
    const typesCount = await Type.count();
    if(typesCount === 0) {
        const typesData = nameTypes.map( name => ({name}))
        await Type.bulkCreate(typesData);
        return typesData;
    }
}

module.exports = allTypes;