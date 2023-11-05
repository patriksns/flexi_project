import React, { useEffect, useState } from 'react';

function DataTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/data');
      const jsonData = await response.json();
      setData(jsonData);
      setLoading(false);
    } catch (error) {
      console.error('Chyba při načítání dat z BE:', error);
      setLoading(false);
    }
  };

  fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Načítám data z BE ...</p>
      ) : (
        <table className="my-table">
          <thead>
            <tr>
              <th>Uživatel</th>
              <th>Kód</th>
              <th>Kontaktní jméno</th>
              <th>Fakturační adresa</th>
              <th>IČ</th>
              <th>DIČ</th>
              <th>Forma dopravy</th>
              <th>Způsob platby</th>
              <th>Stav</th>
              <th>Produkty (kód + název)</th>
              <th>Cena objednávky</th>
              <th>Faktura</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={index}>
                <td>{entry[0].nazFirmy}</td>
                <td>{entry[0].kod}</td>
                <td>{entry[0].kontaktJmeno}</td>
                <td>{`${entry[0].faUlice}, ${entry[0].faPsc} ${entry[0].faMesto}, ${entry[0]['faStat@showAs']}`}</td>
                <td>{entry[0].ic}</td>
                <td>{entry[0].dic}</td>
                <td>{entry[0]['formaDopravy@showAs']}</td>
                <td>{entry[0].zpusobPlatby}</td>
                <td>{entry[0]['stavUzivK@showAs']}</td>
                <td>
                  {entry[0].polozkyObchDokladu ? entry[0].polozkyObchDokladu.map((polozka, i) => (
                    <div key={i}>
                    <div>ID: {polozka.kod}</div>
                    <div>Název: {polozka.nazev}</div>
                    </div>
                  )) : ""} </td>
                <td>{entry[0].sumCelkem}</td>
                <td>{entry[0].faktura}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DataTable;
