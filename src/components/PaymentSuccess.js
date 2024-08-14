import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/PaymentSuccess.css';
import Success from '../Images/success.png';
import DashboardNavbar from './DashboardNavbar';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            fetchCurrentUserDetails(parsedUser);
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
            const user = response.data.user;
            setUser(user);
            localStorage.setItem('user', JSON.stringify(user));
            fetchCurrentUserDetails(user);
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
            const userCart = response.data.cart || [];
            setCart(userCart);
            calculateTotal(userCart);
            clearCart();
        } catch (error) {
            console.error('Error fetching current user details:', error);
            setCart([]);
        }
    };

    const clearCart = async () => {
        const cookies = parseCookies(document.cookie);
        const token = cookies.token;

        try {
            await axios.delete(`http://localhost:4000/api/users/cart/clear`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCart([]);
        } catch (error) {
            console.error('Error clearing the cart:', error);
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

    const calculateTotal = (cartItems) => {
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        console.log('Total:', total);
    };

    return (
        <div>
            <DashboardNavbar />
            <div className="payment-success-container">
                <h1>Payment Successful!</h1>
                <img src={Success} alt="Success" />
                <p>Thank you for your purchase. Your payment has been successfully processed.</p>
                <h4>
                    <u
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate('/dashboard')} // Add onClick handler
                    >
                        Back to home
                    </u>
                </h4>
            </div>
        </div>
    );
};

export default PaymentSuccess;