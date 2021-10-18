import React, { useState, useEffect } from "react";
import './App.css';
import { Stock } from "./Components/Stock";

function App() {
  const[search, setSearch] = useState("NFLX");
  const[price, setPrice] = useState(0);
  
  const emptySearch = () => {
    setSearch("");
  }
  useEffect(() => {
    if (!price) {
      setPrice(0);
    }
  },[price]);

  return (
    <div className="App">
      <h1 className="header-1">Stock Market Site</h1>
      <div className="input-1">
        <form onSubmit={setSearch}>
          <label>
            Stock to search:
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
          </label>
        </form> 
      </div>
      <h3 className="price">Price today is: {price}</h3>
      <div className="empty-button">
        <button onClick={emptySearch}>Reset</button>
      </div>
      <div className="chart-placement">
        <Stock stockName={search} getPrice={setPrice}/>
      </div>
    </div>
  );
}

export default App;