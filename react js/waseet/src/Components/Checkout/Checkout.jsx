import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import './Checkout.css';
import api from '../api-requests'

const Checkout = ({ amount, email, sellername}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [orderStatus, setOrderStatus] = useState(false);

  useEffect(() => {
    // Create PaymentIntent when the component mounts
    api.post('create-payment-intent/', JSON.stringify({ amount, email, sellername }), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      setClientSecret(response.data.client_secret);
    })
      console.log('client:', clientSecret);
  }, [amount, email, sellername]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      console.log(error);
    } else  if (result.paymentIntent.status === "requires_capture") {
      setOrderStatus(true)
      console.log('Order successful!!!!!!!!!!')
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
