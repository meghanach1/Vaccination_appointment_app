import React, { useState } from 'react';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation, useNavigate } from 'react-router-dom';
import './css/Payment.css';

const stripePromise = loadStripe('pk_test_51OHrwDDDNz5rrtDRZKdRaCDPr2ggqQnL16Ey3gK9vRoxZ0I2e0Dt9dWqraHty6RL80iSbjTPV1RGiSbsfBoegnRr00eZUbWf45');

const PaymentForm = ({ onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [cardType, setCardType] = useState('credit'); // Default to credit card
  const navigate = useNavigate();
  const location = useLocation();

  const { patientData, selectedVaccines, selectedDate, selectedLocation, selectedTimeSlot, totalPrice } = location.state || {};
  const patient_id = patientData.patient_id;

  console.log('patient_id:', patient_id);

  const handlePaymentSuccess = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setPaymentError('Card information is missing or invalid.');
      return;
    }

    try {
      const { token, error } = await stripe.createToken(cardElement);

      if (error) {
        // Handle specific error cases
        switch (error.code) {
          case 'card_declined':
            setPaymentError('Card declined. Please use the card number 4000 0000 0000 0002.');
            break;
          case 'insufficient_funds':
            setPaymentError('Insufficient funds. Please use the card number 4000 0000 0000 9995.');
            break;
          case 'expired_card':
            setPaymentError('Card expired. Please use the card number 4000 0000 0000 0069.');
            break;
          case 'incorrect_cvc':
            setPaymentError('Incorrect CVC. Please use the card number 4000 0000 0000 0127.');
            break;
          default:
            setPaymentError(`Payment error: ${error.message}`);
        }
        return;
      }

      // Make API call to create payment
      const paymentData = {
        patient_id: patient_id,
        date_paid: new Date().toISOString(), // Use the current date and time
        amount: totalPrice,
        payment_method: cardType,
        payment_status: 'Completed',
      };
      console.log('payemntpatient', patient_id);
      const response = await fetch('http://127.0.0.1:5000/payment/create_payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log('Payment API response:', response);

      // Here, you can show a dialog box that payment is successful
      alert(`Payment successful! Total Price: ${totalPrice}`);

      // Continue with navigation after successful payment
      onSuccess();
    } catch (error) {
      setPaymentError(error.message);
    }
  };

  const handleBack = () => {
    // Navigate back to the /manage-patient page with patient_id
    navigate('/manage-patient', {
      state: {
        state: {
          patient_id,
          selectedVaccines,
          selectedDate,
          selectedLocation,
          selectedTimeSlot,
          totalPrice,
        },
      },
    });
  };

  const handleCardTypeChange = (type) => {
    setCardType(type);
  };

  return (
    <div align='center'>
      <h1>Payment</h1>
      <p>Select Card Type:</p>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
    <label className='paymentclasslabel'>
      <input
        className='paymentlabel'
        type="radio"
        value="debit"
        checked={cardType === 'debit'}
        onChange={() => handleCardTypeChange('debit')}
      />
      Debit Card
    </label>
    <label className='paymentclasslabel'>
      <input
        className='paymentlabel'
        type="radio"
        value="credit"
        checked={cardType === 'credit'}
        onChange={() => handleCardTypeChange('credit')}
      />
      Credit Card
    </label>
  </div>

      <form onSubmit={handlePaymentSuccess}>
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Pay Now
        </button>
      </form>
      <button type="button" onClick={handleBack}>
        Back
      </button>
      {paymentError && <p style={{ color: 'red' }}>{paymentError}</p>}

      <button onClick={() => navigate('/appointment')}>
        Pay Later at the Vaccine Center
      </button>
    </div>
  );
};

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { patientData, selectedVaccines, selectedDate, selectedLocation, selectedTimeSlot, totalPrice } = location.state || {};
  const patient_id = patientData.patient_id;
  console.log('selectedDate:', selectedDate);
  console.log('selectedLocation:', selectedLocation);
  console.log('selectedTimeSlot:', selectedTimeSlot);
  console.log('patient_id:', patient_id);

  const handlePaymentSuccess = () => {
    // Navigate to the appointment confirmation page
    navigate('/appointment', {
      state: {
        patient_id,
        selectedVaccines,
        selectedDate,
        selectedLocation,
        selectedTimeSlot,
        totalPrice,
      },
    });
  };

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm onSuccess={handlePaymentSuccess} />
    </Elements>
  );
};

export default Payment;
