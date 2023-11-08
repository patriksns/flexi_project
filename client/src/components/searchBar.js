import React, { Component } from 'react';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      results: [],
    };
  }

  handleInputChange = (event) => {
    this.setState({ query: event.target.value });
  }

  handleSearch = () => {
    const apiUrl = 'http://localhost:5000/api/data';
  
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Text na malá písmena
        const query = this.state.query.toLowerCase();
  
        // Vyhledávání dat
        const filteredData = data.map((obj) => (
          obj.filter((item) => (
            item.nazFirmy.toLowerCase().includes(query) ||
            item.kod.toLowerCase().includes(query) ||
            item.kontaktJmeno.toLowerCase().includes(query)
          ))
        ));
  
        // Sloučení výsledků z různých objektů do jednoho pole
        const combinedResults = [].concat(...filteredData);
  
        this.setState({ results: combinedResults });
      })
      .catch((error) => console.error('Chyba při získávání dat ze serveru:', error));
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Vyhledat podle názvu"
          value={this.state.query}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleSearch}>Hledat</button>
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
            {this.state.results.map((item) => (
              <tr key={item.id}>
                <td>{item.nazFirmy}</td>
                <td>{item.kod}</td>
                <td>{item.kontaktJmeno}</td>
                <td>{`${item.faUlice}, ${item.faPsc} ${item.faMesto}, ${item['faStat@showAs']}`}</td>
                <td>{item.ic}</td>
                <td>{item.dic}</td>
                <td>{item['formaDopravy@showAs']}</td>
                <td>{item.zpusobPlatby}</td>
                <td>{item['stavUzivK@showAs']}</td>
                <td>
                  {item.polozkyObchDokladu ? item.polozkyObchDokladu.map((polozka, i) => (
                    <div key={i}>
                    <div>ID: {polozka.kod}</div>
                    <div>Název: {polozka.nazev}</div>
                    </div>
                  )) : ""} </td>
                <td>{item.sumCelkem}</td>
                <td>{item.faktura}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {this.state.results.length === 0 && <p>Žádné výsledky nenalezeny.</p>}
      </div>
    );
  }
}

export default SearchBar;
