import React from 'react';
import Cover from './Cover';
import SearchBar from './SearchBar';
import SearchImage from './SearchImage';
import SearchEngines from './SearchEngines';
import './Home.css';


function Home() {
  return (
    <main>
      <div className="portada">
        <Cover />
        <div className="barras">
          <SearchEngines />
          <SearchBar />
          <SearchImage />
          
        </div>
      </div>
    </main>
  );
}

export default Home;
