// src/components/Basket.js
import React, { useState } from "react";

function Basket({ basketItems }) {
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");

  const totalAmount = basketItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="basket">
      <h3>Your Basket</h3>
      <ul className="list-group mb-3">
        {basketItems.map((item, index) => (
          <li key={index} className="list-group-item">
            {item.name} - ₱{item.price}
          </li>
        ))}
      </ul>
      <h4>Total: ₱{totalAmount}</h4>
      
      <div className="payment-method mt-3">
        <label>Choose Payment Method:</label>
        <select className="form-control" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option>Credit Card</option>
          <option>Paypal</option>
          <option>Cash on Delivery</option>
        </select>
      </div>
      
      <button className="btn btn-dark mt-3" onClick={() => alert("Order Placed!")}>Place Order</button>
    </div>
  );
}

export default Basket;
