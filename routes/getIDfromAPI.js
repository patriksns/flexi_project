const axios = require('axios');
const apiUrl = 'https://demo.flexibee.eu/c/demo/objednavka-prijata.json?start=0&limit=100000';

let cachedIDs = null; // Proměnná pro mezipaměť dat

async function getIDsFromApi(apiUrl) {
  // Pokud jsou ID již v mezipaměti použiju je
  if (cachedIDs) {
    console.log("Používám IDs z mezipaměti");
    return { ids: cachedIDs };
  }
  
  try {
    const response = await axios.get(apiUrl);
    const objednavky = response.data.winstrom['objednavka-prijata'];
    const ids = objednavky.map(objekt => objekt.id);
    console.log('IDs ze všech objektů:', ids);
    
    // Uložení IDs do mezipaměti
    cachedIDs = ids;
    
    return { ids };
  } catch (error) {
    throw new Error('Error při stahování IDs z API: ' + error);
  }
}

module.exports = {
  getIDsFromApi,
  apiUrl
};