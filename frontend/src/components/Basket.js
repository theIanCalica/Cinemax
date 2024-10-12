// src/components/Basket.js
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Icons for edit and delete

function Basket({ basketItems, setBasketItems }) {
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");

  // Calculate total amount based on price * quantity
  const totalAmount = basketItems.reduce(
    (total, item) => total + (item.price * item.quantity || 0),
    0
  );

  // Handle quantity change
  const handleQuantityChange = (index, newQuantity) => {
    const updatedItems = [...basketItems];
    if (newQuantity > 0) {
      updatedItems[index].quantity = newQuantity;
      setBasketItems(updatedItems);
    }
  };

  // Handle item removal
  const handleRemoveItem = (index) => {
    const updatedItems = basketItems.filter((_, i) => i !== index);
    setBasketItems(updatedItems);
  };

  return (
    <div className="basket" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '8px', backdropFilter: 'blur(10px)' }}>
      <h3 style={{ color: '#ff8c00' }}>Your Basket</h3>
      {basketItems.length === 0 ? (
        <p>Your basket is empty.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {basketItems.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center" style={{ backgroundColor: 'transparent', border: '1px solid rgba(255, 204, 128, 0.5)' }}>
                <div>
                  {item.name} - ₱{item.price} x {item.quantity}
                </div>
                <div>
                  {/* Edit Quantity */}
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)}
                    style={{ width: "50px", marginRight: "10px" }}
                  />
                  <FaEdit style={{ cursor: "pointer", marginRight: "10px", color: '#ff8c00' }} />
                  
                  {/* Delete Item */}
                  <FaTrash
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => handleRemoveItem(index)}
                  />
                </div>
              </li>
            ))}
          </ul>
          <h4 style={{ color: '#ff8c00' }}>Total: ₱{totalAmount.toFixed(2)}</h4> {/* Format total amount to 2 decimal places */}

          <div className="payment-method mt-3">
            <label>Choose Payment Method:</label>
            <select
              className="form-control"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={{ borderRadius: '5px', borderColor: '#ffcc80' }}
            >
              <option>Credit Card</option>
              <option>Paypal</option>
              <option>Cash on Delivery</option>
            </select>
          </div>

          <button
            className="btn"
            style={{
              backgroundColor: '#ffcc80',
              color: '#ffffff',
              marginTop: '10px',
              borderRadius: '5px',
              border: 'none'
            }}
            onClick={() => alert("Order Placed!")}
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default Basket;
