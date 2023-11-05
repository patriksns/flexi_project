const axios = require('axios');
const { getIDsFromApi, apiUrl } = require("./getIDfromAPI");

let cachedData = null; // Proměnná pro mezipaměť dat

async function fetchDataFromAPI(ids) {  
  const urls = ids.map(id => `https://demo.flexibee.eu/c/demo/objednavka-prijata/${id}.json`);
  
  // Pokud jsou data již v mezipaměti použiju je
  if (cachedData) {
    console.log("Používám data z mezipaměti.");
    return cachedData;
  }
  
  const responses = await Promise.all(urls.map(url => axios.get(url)));
  const data = responses.map(response => response.data.winstrom["objednavka-prijata"]);
  
  // Uložení dat do mezipaměti
  cachedData = data;
  
  return data;
}
  
async function main() {
  try {
    const result = await getIDsFromApi(apiUrl);
    const ids = result.ids;
    const data = await fetchDataFromAPI(ids);
  } catch (error) {
    console.error('Error při stahování dat z API:', error);
  }
}
  
main();

module.exports = {
  fetchDataFromAPI
};
