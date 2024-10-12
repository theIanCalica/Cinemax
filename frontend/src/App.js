// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { FaShoppingBasket, FaFilter } from "react-icons/fa";
import FoodGallery from "./components/FoodGallery";
import Basket from "./components/Basket";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import './App.css';  // Import the CSS file

function App() {
  const [basketItems, setBasketItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  // Toggle filter visibility
  const toggleFilters = () => setShowFilters(!showFilters);

  // Function to add items to the basket
  const addToBasket = (item) => {
    const existingItem = basketItems.find((basketItem) => basketItem.id === item.id);
    if (existingItem) {
      const updatedBasket = basketItems.map((basketItem) =>
        basketItem.id === item.id
          ? { ...basketItem, quantity: basketItem.quantity + 1 }
          : basketItem
      );
      setBasketItems(updatedBasket);
    } else {
      setBasketItems([...basketItems, { ...item, quantity: 1 }]);
    }
  };

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar navbar-expand-lg navbar-dark bg-soft-dark-orange">
          <Link className="navbar-brand" to="/">Cinemax Food</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Food Gallery</Link>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2 search-input"
                type="search"
                placeholder="Search food..."
                aria-label="Search"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
            <div className="ml-3 d-flex align-items-center">
              <Link to="/basket" className="basket-icon ml-3">
                <FaShoppingBasket color="white" size="1.5em" />
                {basketItems.length > 0 && <span className="basket-count">{basketItems.length}</span>}
              </Link>
              <FaFilter
                color="white"
                size="1.5em"
                className="ml-3 filter-icon"
                style={{ cursor: "pointer" }}
                onClick={toggleFilters}
              />
            </div>
          </div>
        </nav>

        {/* Category Filters */}
        {showFilters && (
          <div className="filters container mt-4">
            <div className="btn-group">
              <Button variant="outline-light" onClick={() => setCategory("All")}>All</Button>
              <Button variant="outline-light" onClick={() => setCategory("Fast Food")}>Fast Food</Button>
              <Button variant="outline-light" onClick={() => setCategory("Healthy")}>Healthy</Button>
              <Button variant="outline-light" onClick={() => setCategory("Japanese")}>Japanese</Button>
              <Button variant="outline-light" onClick={() => setCategory("Mexican")}>Mexican</Button>
              <Button variant="outline-light" onClick={() => setCategory("Italian")}>Italian</Button>
              <Button variant="outline-light" onClick={() => setCategory("Dessert")}>Dessert</Button>
              <Button variant="outline-light" onClick={() => setCategory("Breakfast")}>Breakfast</Button>
              <Button variant="outline-light" onClick={() => setCategory("Western")}>Western</Button>
            </div>
          </div>
        )}

        <div className="container mt-4">
          <Routes>
            <Route
              path="/"
              element={
                <FoodGallery
                  addToBasket={addToBasket}
                  searchTerm={searchTerm}
                  category={category}
                  setCategory={setCategory}
                />
              }
            />
            <Route
              path="/basket"
              element={
                <Basket
                  basketItems={basketItems}
                  setBasketItems={setBasketItems}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
