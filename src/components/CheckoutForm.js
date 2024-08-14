import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutForm = ({ cart, user, calculateTotal }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        try {
            const { data: clientSecret } = await axios.post('http://localhost:4000/api/payments/create-checkout-session', {
                amount: calculateTotal() * 100, // Stripe works with cents
                cart,
                user
            });

            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: user.name,
                        email: user.email,
                    },
                },
            });

            if (error) {
                setError(error.message);
                setLoading(false);
            } else if (paymentIntent.status === 'succeeded') {
                setSuccess(true);
                setLoading(false);
                console.log('Payment succeeded:', paymentIntent);
                // Handle post-payment tasks (e.g., updating the backend, redirecting to a success page)
            }
        } catch (error) {
            setError(error.response ? error.response.data.message : error.message);
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe || loading}>
                {loading ? 'Processing...' : 'Pay Now'}
            </button>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">Payment succeeded!</div>}
        </form>
    );
};

export default CheckoutForm;
