const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const { getIDsFromApi, apiUrl } = require("./routes/getIDfromAPI");
const { fetchDataFromAPI } = require("./routes/getJSONdata");
const cors = require('cors');

const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));

app.get("/", (req,res) => {
    res.send("Toto je BE")
});

app.listen(PORT, (err) => {
    console.log(`Server běží na ${PORT}`)
});

// podpora GET/POST data struktur pro Express
app.use(express.json({extended: false}));
app.use(express.text({extended: false}));

app.get('/api/data', async (req, res) => {
  try {
    const result = await getIDsFromApi(apiUrl); // získání seznamu IDs
    const ids = result.ids; // tvorba pole IDs
    const data = await fetchDataFromAPI(ids); // získání dat na základě IDs
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error při získávání dat z API" });
  }
});
