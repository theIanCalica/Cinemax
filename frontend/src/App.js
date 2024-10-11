// src/App.js
import React, { useState } from "react";
import FoodGallery from "./components/FoodGallery";
import Basket from "./components/Basket";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function App() {
  const [basketItems, setBasketItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Add to basket
  const addToBasket = (foodItem) => {
    setBasketItems([...basketItems, foodItem]);
  };

  // Handle search functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Cinemax Food</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home</a>
            </li>
          </ul>
          <input
            type="text"
            className="form-control"
            placeholder="Search food..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </nav>

      <div className="container mt-4">
        <FoodGallery addToBasket={addToBasket} searchTerm={searchTerm} />
        <Basket basketItems={basketItems} />
      </div>
    </div>
  );
}

export default App;
