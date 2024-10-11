// src/components/FoodGallery.js
import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";

const foodData = [
  { id: 1, name: "Burger", category: "Fast Food", price: 120 },
  { id: 2, name: "Pizza", category: "Fast Food", price: 220 },
  { id: 3, name: "Salad", category: "Healthy", price: 100 },
  // Add 30 food items in total...
];

function FoodGallery({ addToBasket, searchTerm }) {
  const [category, setCategory] = useState("All");

  // Filter by category and search term
  const filteredFood = foodData.filter(
    (food) =>
      (category === "All" || food.category === category) &&
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h3>Food Choices</h3>
      <div className="filters mb-3">
        <Button variant="outline-dark" onClick={() => setCategory("All")}>All</Button>
        <Button variant="outline-dark" onClick={() => setCategory("Fast Food")}>Fast Food</Button>
        <Button variant="outline-dark" onClick={() => setCategory("Healthy")}>Healthy</Button>
        {/* Add more categories as needed */}
      </div>

      <div className="food-gallery d-flex flex-wrap">
        {filteredFood.map((food) => (
          <Card key={food.id} style={{ width: '18rem', margin: '10px' }}>
            <Card.Body>
              <Card.Title>{food.name}</Card.Title>
              <Card.Text>Price: ₱{food.price}</Card.Text>
              <Button variant="dark" onClick={() => addToBasket(food)}>Add to Basket</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default FoodGallery;
