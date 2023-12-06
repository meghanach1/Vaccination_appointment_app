import React, { useState, useEffect } from 'react';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51OHrwDDDNz5rrtDRZKdRaCDPr2ggqQnL16Ey3gK9vRoxZ0I2e0Dt9dWqraHty6RL80iSbjTPV1RGiSbsfBoegnRr00eZUbWf45');

const PaymentForm = ({ onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [cardType, setCardType] = useState('credit'); // Default to credit card
  const navigate = useNavigate();
  const location = useLocation();
  const { paymentDetails } = location.state || {};

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Handle payment success directly without creating a token
    handlePaymentSuccess();
  };

  const handlePaymentSuccess = () => {
    onSuccess();
  };

  const handleBack = () => {
    navigate('/manage-payments');
  };

  const handleCardTypeChange = (type) => {
    setCardType(type);
  };

  return (
    <div align="center">
      <h1>Payment</h1>
      <p>Select Card Type:</p>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <label>
          <input
            type="radio"
            value="debit"
            checked={cardType === 'debit'}
            onChange={() => handleCardTypeChange('debit')}
          />
          Debit Card
        </label>
        <label>
          <input
            type="radio"
            value="credit"
            checked={cardType === 'credit'}
            onChange={() => handleCardTypeChange('credit')}
          />
          Credit Card
        </label>
      </div>

      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Pay Now
        </button>
      </form>
      <button type="button" onClick={handleBack}>
        Back
      </button>
      {paymentError && <p style={{ color: 'red' }}>{paymentError}</p>}
      <br />
    </div>
  );
};

const Payment = ({ onSuccess }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentError, setPaymentError] = useState(null);

  // Extract necessary data from location.state
  const { id, patient_id } = location.state || {};

  // Function to handle payment success
  const handlePaymentSuccess = async () => {
    try {
      // Make a request to update payment status
      await axios.put(
        `http://127.0.0.1:5000/payment/update_payment_status/${id}`,
        {
          "payment_status":"Completed",
          "date_paid":"12-06-2023",
          "payment_method":"credit card"
      
      }, // pass an empty object as the second parameter to ensure Content-Type is set to 'application/json'
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("updated called");
      window.alert('Payment successful!');
      // Navigate back to manage-payments
      navigate('/manage-payments');
    } catch (error) {
      console.error('Error updating payment status:', error);
      setPaymentError('Error updating payment status');
    }
  };
  

  // Render the component
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm onSuccess={handlePaymentSuccess} />
    </Elements>
  );
};

export default Payment;
