import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaSpinner, FaBox } from 'react-icons/fa'; // Icons for status
import '../Styles/MyOrders.css'; // Add your styles

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            fetchOrders(parsedUser.userId);
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
            fetchOrders(user.userId);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const fetchOrders = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:4000/api/orders/${userId}`);
            setOrders(response.data.orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
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

    const renderStatusIcons = (status) => {
        return (
            <div className="status-icons">
                <FaCheckCircle 
                    className={`status-icon ${status === 'Confirmed' ? 'active' : ''}`}
                    title="Confirmed"
                />
                <FaSpinner 
                    className={`status-icon ${status === 'In Progress' ? 'active' : ''}`}
                    title="In Progress"
                />
                <FaBox 
                    className={`status-icon ${status === 'Delivered' ? 'active' : ''}`}
                    title="Delivered"
                />
            </div>
        );
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div className="my-orders-container">
            <h2>My Orders</h2>
            <div className="orders-grid">
                {orders.length > 0 ? (
                    orders.map(order => (
                        <div key={order._id} className="order-card">
                            {renderStatusIcons(order.status)}
                            <div className="order-details">
                                <p><strong>Delivery Status:</strong> {order.status}</p>

                                <p><strong>Delivery Date:</strong> {formatDate(order.deliveryDate)}</p>
                                <p><strong>Order Date:</strong> {formatDate(order.createdAt)}</p>
                                <p><strong>Amount:</strong> ${order.transaction.amount}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
