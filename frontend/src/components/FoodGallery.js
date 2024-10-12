// src/components/FoodGallery.js
import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";

const foodData = [
  { id: 1, name: "Burger", category: "Fast Food", price: 120 },
  { id: 2, name: "Pizza", category: "Fast Food", price: 220 },
  { id: 3, name: "Salad", category: "Healthy", price: 100 },
  { id: 4, name: "Fries", category: "Fast Food", price: 90 },
  { id: 5, name: "Sushi", category: "Japanese", price: 300 },
  { id: 6, name: "Ramen", category: "Japanese", price: 250 },
  { id: 7, name: "Tacos", category: "Mexican", price: 150 },
  { id: 8, name: "Burrito", category: "Mexican", price: 200 },
  { id: 9, name: "Pad Thai", category: "Thai", price: 180 },
  { id: 10, name: "Tom Yum", category: "Thai", price: 220 },
  // More food items...
];

function FoodGallery({ addToBasket, searchTerm, category, setCategory }) {
  // Filter food by category and search term
  const filteredFood = foodData.filter(
    (food) =>
      (category === "All" || food.category === category) &&
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h3>Food Choices</h3>

      <div className="food-gallery row">
        {filteredFood.map((food) => (
          <div className="col-md-3 mb-4" key={food.id}>
            <Card style={{ width: '100%' }}>
              <Card.Img variant="top" src="https://via.placeholder.com/150" alt={food.name} />
              <Card.Body>
                <Card.Title>{food.name}</Card.Title>
                <Card.Text>Price: ₱{food.price}</Card.Text>
                <Button variant="dark" onClick={() => addToBasket(food)}>Add to Basket</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodGallery;
