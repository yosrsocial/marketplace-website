import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import './Checkout.css';
import api from '../api-requests'

const Checkout = ({ amount, email, sellerId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Create PaymentIntent when the component mounts
    api.post('create-payment-intent/', JSON.stringify({ amount, email, seller_id: sellerId }), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    /*
    fetch('http://127.0.0.1:8000/api/create-payment-intent/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, email, seller_id: sellerId }),
    })*/
      .then((res) => res.json())
      .then((data) => setClientSecret(data.client_secret));
      console.log('client:', clientSecret);
  }, [amount, email, sellerId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      console.log(error);
    } else if (paymentIntent) {
      console.log('Payment successful:', paymentIntent);
      // Store paymentIntent.id for later capturing
    }
  };

  return (
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>

    
);
};

export default Checkout;
