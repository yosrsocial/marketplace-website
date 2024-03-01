import React, { useState } from 'react';
import './Checkout.css';

const Checkout = () => {
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleDeliveryChange = (option) => {
    setDeliveryMethod(option);
  };

  const handlePaymentChange = (option) => {
    setPaymentMethod(option);
  };

  const handleCheckout = () => {
    // Implement your checkout logic here
    console.log(`Selected Delivery Method: ${deliveryMethod}`);
    console.log(`Selected Payment Method: ${paymentMethod}`);
    // Add logic to navigate to the next step or complete the order
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="section">
        <h3>Choose Delivery Method</h3>
        <label>
          <input
            type="radio"
            value="standard"
            checked={deliveryMethod === 'standard'}
            onChange={() => handleDeliveryChange('standard')}
          />
          Standard Delivery
        </label>
        <label>
          <input
            type="radio"
            value="express"
            checked={deliveryMethod === 'express'}
            onChange={() => handleDeliveryChange('express')}
          />
          Express Delivery
        </label>
      </div>

      <div className="section">
        <h3>Choose Payment Method</h3>
        <label>
          <input
            type="radio"
            value="creditCard"
            checked={paymentMethod === 'creditCard'}
            onChange={() => handlePaymentChange('creditCard')}
          />
          Credit Card
        </label>
        <label>
          <input
            type="radio"
            value="paypal"
            checked={paymentMethod === 'paypal'}
            onChange={() => handlePaymentChange('paypal')}
          />
          PayPal
        </label>
      </div>

      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
};

export default Checkout;
