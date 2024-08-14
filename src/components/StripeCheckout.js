import React, {useEffect, useState} from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

// Replace this with your own public key from Stripe Dashboard
const stripePromise = loadStripe('pk_test_51Pg7EiRwFwvMOgq40okBBPRVuq1hP3lJssmeCxM9b58j8QSHh28iS9AmZpMqubqiBOjwDd06ECL7EZnYx8TZpOmA00gnXjYNNB');

const StripeCheckout = ({ cart }) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            fetchCurrentUserDetails(JSON.parse(storedUser));
        } else {
            fetchUserDetails();
        }
    }, []);

    const fetchUserDetails = async () => {
        const cookies = parseCookies(document.cookie);
        const token = cookies.token;

        if (!token) {
            return;
        }

        try {
            const response = await axios.get('http://localhost:4000/api/users/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(response.data.user);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            fetchCurrentUserDetails(response.data.user);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const fetchCurrentUserDetails = async (user) => {
        const cookies = parseCookies(document.cookie);
        const token = cookies.token;

        try {
            const response = await axios.get(`http://localhost:4000/api/users/${user.userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // setCart(response.data.cart || []);
            // calculateTotal(response.data.cart || []);
        } catch (error) {
            console.error('Error fetching current user details:', error);
        }
    };

    const parseCookies = (cookies) => {
        return cookies
            .split(';')
            .map(cookie => cookie.trim())
            .reduce((acc, cookie) => {
                const [name, value] = cookie.split('=');
                acc[name] = decodeURIComponent(value);
                return acc;
            }, {});
    };
    const handleCheckout = async () => {
        try {
            const userId = user.userId;
            const response = await axios.post('http://localhost:4000/api/create-checkout-session', { cart, userId });

            if (response.status === 200) {
                const { id } = response.data;
                const stripe = await stripePromise;
                const { error } = await stripe.redirectToCheckout({ sessionId: id });

                if (error) {
                    console.error('Stripe Checkout error:', error);
                }
            } else {
                console.error('Unexpected response status:', response.status);
            }
        } catch (error) {
            console.error('Error creating checkout session:', error);
            alert('An error occurred while creating the checkout session. Please try again.');
        }
    };

    return (
        <button onClick={handleCheckout} className='checkout-button'>
            Checkout
        </button>
    );
};

export default StripeCheckout;