import React, { useState } from 'react';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe('your_publishable_key_here'); // Replace with your actual publishable key

const PaymentForm = ({ onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [cardType, setCardType] = useState('credit'); // Default to credit card
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { token } = await stripe.createToken(cardElement);

      console.log('Stripe Token:', token);
      // Here, you would typically send the token to your server for payment processing
      // For the sake of this example, we assume the payment is successful
      onSuccess();
    } catch (error) {
      setPaymentError(error.message);
    }
  };

  const handleCardTypeChange = (type) => {
    setCardType(type);
  };

  return (
    <div align="center">
      <h1>Payment</h1>
      <p>Select Card Type:</p>
      <div>
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

      {paymentError && <p style={{ color: 'red' }}>{paymentError}</p>}

      <button onClick={() => navigate('/appointment')}>
        Pay Later at the Vaccine Center
      </button>
    </div>
  );
};

const Payment = () => {
  const navigate = useNavigate();

  const handlePaymentSuccess = () => {
    // Navigate to the appointment confirmation page
    navigate('/appointment');
  };

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm onSuccess={handlePaymentSuccess} />
    </Elements>
  );
};

export default Payment;
