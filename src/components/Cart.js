import DashboardNavbar from './DashboardNavbar';
import { loadStripe } from '@stripe/stripe-js';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/Cart.css';
import { MdEdit, MdDelete } from 'react-icons/md';
import { Tooltip } from 'react-tooltip';
import { useNavigate } from 'react-router-dom';
import StripeCheckout from './StripeCheckout';
import { Elements } from '@stripe/react-stripe-js';
import Select from 'react-select';

const Cart = () => {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const [promoCode, setPromoCode] = useState('');
    const stripePromise = loadStripe('pk_test_51Pg7EiRwFwvMOgq40okBBPRVuq1hP3lJssmeCxM9b58j8QSHh28iS9AmZpMqubqiBOjwDd06ECL7EZnYx8TZpOmA00gnXjYNNB');
    const [streetAddress, setStreetAddress] = useState('');
    const [apartment, setApartment] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [country, setCountry] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    
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
            setCart(response.data.cart || []);
            calculateTotal(response.data.cart || []);
        } catch (error) {
            console.error('Error fetching current user details:', error);
            setCart([]);
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


    const updateCartInDatabase = async (updatedCart) => {
        const cookies = parseCookies(document.cookie);
        const token = cookies.token;
        try {
            await axios.post('http://localhost:4000/api/users/update-cart', { cart: updatedCart }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error('Error updating cart in database:', error);
        }
    };

    const handleIncrement = async (itemId) => {
        const updatedCart = cart.map(cartItem =>
            cartItem.id === itemId
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
        setCart(updatedCart);
        calculateTotal(updatedCart);
        await updateCartInDatabase(updatedCart);
    };

    const handleDecrement = async (itemId) => {
        const updatedCart = cart
            .map(cartItem =>
                cartItem.id === itemId && cartItem.quantity > 1
                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem
            )
            .filter(cartItem => cartItem.quantity > 0);
        setCart(updatedCart);
        calculateTotal(updatedCart);
        await updateCartInDatabase(updatedCart);
    };

    const handleRemove = async (itemId) => {
        const updatedCart = cart.filter(cartItem => cartItem.id !== itemId);
        setCart(updatedCart);
        calculateTotal(updatedCart);
        await updateCartInDatabase(updatedCart);
    };

    const handleCheckout = () => {
        console.log('Proceeding to checkout...');
        navigate('/checkout');  // Use navigate for navigation
    };

    const calculateTotal = (cart) => {
        const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
        const deliveryCharge = 20;
        const promoDiscount = promoCode === 'FIRST5' ? 5 : 0;
        return (subtotal + deliveryCharge - promoDiscount).toFixed(2);
    };

    const handleToken = async (token) => {
        try {
            const response = await axios.post('http://localhost:4000/create-checkout-session', {
                cart,
                token
            });

            if (response.status === 200) {
                window.location.href = response.data.redirectUrl; // Redirect to Stripe Checkout
            } else {
                console.error('Unexpected response status:', response.status);
            }
        } catch (error) {
            console.error('Error creating checkout session:', error);
            alert('An error occurred while creating the checkout session. Please try again.');
        }
    };
    const countries = [
        { value: 'US', label: 'United States' },
        { value: 'CA', label: 'Canada' },
        // Add more countries as needed
    ];
    
    const states = {
        US: [
            { value: 'AL', label: 'Alabama' },
            { value: 'CA', label: 'California' },
            // Add more states as needed
        ],
        CA: [
            { value: 'AB', label: 'Alberta' },
            { value: 'BC', label: 'British Columbia' },
            // Add more provinces as needed
        ],
        // Add more country-state mappings as needed
    };
    
    return (
        <div>
            <DashboardNavbar />
            <div className='cart-component-container'>
                <div className='cart-container'>
                    <h2>Your Cart</h2>
                    <div className='cart-items'>
                        {cart.length > 0 ? (
                            cart.map(item => (
                                <div key={item.id} className='product-card'>
                                    <div className='product-image-container'>
                                        <img src={`http://localhost:4000/uploads/${item.image}`} alt={item.name} className='product-image' />
                                    </div>
                                    <div className='product-details'>
                                        <div className='name-section'>
                                            <h3>{item.name}</h3>
                                            <div className='edit-delete-icons'>
                                                <MdDelete className='icon' onClick={() => handleRemove(item.id)} data-tooltip-id={`delete-tooltip-${item.id}`} data-tooltip-content="Remove Item" />
                                                <Tooltip id={`delete-tooltip-${item.id}`} place="top" type="dark" effect="float" />
                                            </div>
                                        </div>
                                        <p>{item.description}</p>
                                        <div className='product-price-count'>
                                            <p>Price: ${item.price}</p>
                                            <p>per {item.unit}</p>
                                        </div>
                                        <div className='quantity-controls-button'>
                                            <button onClick={() => handleDecrement(item.id)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => handleIncrement(item.id)}>+</button>
                                        </div>
                                        <div className="total-price-item">
                                            Total: ${(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Your cart is empty.</p>
                        )}
                    </div>
                </div>
                <div className='checkout-container'>
                    <h2>Shipping Address</h2>
                    <div className='address-summary'>

                    <div>
                        {/* <label htmlFor='fullName'>Full Name</label> */}
                        <input
                            id='fullName'
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder='Name'
                        />
                    </div>
                    <div>
                        {/* <label htmlFor='phoneNumber'>Phone Number</label> */}
                        <input
                            id='phoneNumber'
                            value={phoneNumber}
                            placeholder='Phone Number'
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div>
                        {/* <label htmlFor='streetAddress'>Street Address</label> */}
                        <input
                            id='streetAddress'
                            value={streetAddress}
                            placeholder='Street Address'
                            onChange={(e) => setStreetAddress(e.target.value)}
                        />
                    </div>
                    <div>
                        {/* <label htmlFor='apartment'>Apt/Suite</label> */}
                        <input
                            id='apartment'
                            value={apartment}
                            placeholder='Apt/Suite'
                            onChange={(e) => setApartment(e.target.value)}
                        />
                    </div>
                    <div>
                        {/* <label htmlFor='city'>City</label> */}
                        <input
                            id='city'
                            value={city}
                            placeholder='City'
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div>
                        {/* <label htmlFor='country'>Country</label> */}
                        <Select
                            id='country'
                            options={countries}
                            value={countries.find(c => c.value === country)}
                            placeholder='Country'
                            onChange={(selectedOption) => {
                                setCountry(selectedOption.value);
                                setState('');
                            }}
                            className='react-select'
                        />
                    </div>
                    <div>
                        {/* <label htmlFor='state'>State</label> */}
                        <Select
                            id='state'
                            options={states[country] || []}
                            value={states[country]?.find(s => s.value === state)}
                            placeholder='State'
                            onChange={(selectedOption) => setState(selectedOption.value)}
                            className='react-select'
                            isDisabled={!country}
                        />
                    </div>
                    <div>
                        {/* <label htmlFor='zipCode'>ZIP Code</label> */}
                        <input
                            id='zipCode'
                            value={zipCode}
                            placeholder='ZIP Code'
                            onChange={(e) => setZipCode(e.target.value)}
                        />
                    </div>
                    </div>
                    <div>
                    <h2>Promo Code</h2>

                        {/* <label htmlFor='promoCode'>Promo Code</label> */}
                        <input
                            id='promoCode'
                            value={promoCode}
                            placeholder='Have a coupon?'
                            onChange={(e) => setPromoCode(e.target.value)}
                        />
                    </div>
                    <h2>Cart Totals</h2>

                    <div className='address-summary'>
                        <div>
                            <h5>Subtotal: <span>${(cart.reduce((total, item) => total + item.price * item.quantity, 0)).toFixed(2)}</span></h5>
                        </div>
                        <div>
                            <h5>Delivery Charge: <span>$20.00</span></h5>
                        </div>
                        {promoCode === 'FIRST5' && (
                            <div>
                                <h5>Promo Discount: <span>-$5.00</span></h5>
                            </div>
                        )}
                        <hr></hr>
                        <div>
                            <h5>Total: <span>${calculateTotal(cart)}</span></h5>
                        </div>
                        <Elements stripe={stripePromise}>
                            <StripeCheckout cart={cart}/>
                        </Elements>
                    </div>  
                </div>
            </div>
        </div>
    );
};

export default Cart;
