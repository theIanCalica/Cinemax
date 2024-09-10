import React from "react";

const TopFoods = () => {
  const foods = [
    { name: "Pizza", orders: 150 },
    { name: "Burger", orders: 120 },
    { name: "Sushi", orders: 90 },
    { name: "Pasta", orders: 80 },
    { name: "Tacos", orders: 70 },
  ];

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Top Foods</h2>
      <ul>
        {foods.map((food, index) => (
          <li key={index} className="flex justify-between mb-2">
            <span>{food.name}</span>
            <span>{food.orders} Orders</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopFoods;
