import React from 'react';
import DataTable from '../components/dataTable';
import SearchBar from '../components/searchBar';

const Home = () => {
  return (
    <div>
      <div className="SearchAndTitle">
        <div>
          <h1>Tabulka s daty</h1>
        </div>
        <div>
          <SearchBar />
        </div>
      </div>
      <DataTable />
    </div>
  );
}

export default Home;
