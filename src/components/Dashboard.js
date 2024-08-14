import React, { useState, useEffect } from 'react';
import DashboardNavbar from './DashboardNavbar';
import '../Styles/Dashboard.css';
import Fruits from '../Images/fruits.jpeg';
import Vegies from '../Images/vegies.webp';
import Diary from '../Images/diary.webp';
import Meat from '../Images/meat.jpeg';
import Snack from '../Images/chips.jpeg';
import Pulses from '../Images/pulses.avif';
import Nuts from '../Images/nuts.png';
import axios from 'axios';

const Dashboard = () => {
    const [selectedCategory, setSelectedCategory] = useState('Fruits');
    const [items, setItems] = useState([]);
    const [user, setUser] = useState(null);
    const [ currentUser, setCurrentUser] = useState(null);
    const [cart, setCart] = useState([]);
    const [itemCounts, setItemCounts] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        // Fetch user details using token from cookie
        if (storedUser) {
            setUser(JSON.parse(storedUser));
          } 
        else {
        const fetchUserDetails = async () => {
        console.log("fetchUserDetails method begin");
        const cookies = parseCookies(document.cookie);
        const token = cookies.token;

        if (!token) {
            // Handle case where token is not found
            
            return;
        }
        console.log("backend call");
        try {
            const response = await axios.get('http://localhost:4000/api/users/profile', {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
            });
            setUser(response.data.user); 
            localStorage.setItem('user', JSON.stringify(response.data.user));
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
        };

        fetchUserDetails();
    }
    }, []); 

    // current user
    useEffect(() => {
        if (user && user.userId) {
            const fetchCurrentUserDetails = async () => {
                try {
                    const cookies = parseCookies(document.cookie);
                    const token = cookies.token;
                    const response = await axios.get(`http://localhost:4000/api/users/${user.userId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`, // Include token in Authorization header
                        },
                    });
                    setCurrentUser(response.data);
                    setCart(response.data.cart || []);
                } catch (error) {
                    console.error('Error fetching current user details:', error);
                }
            };
    
            fetchCurrentUserDetails();
        }
    }, [user]);

    // parse cookies and fetch value
    function parseCookies(cookies) {
    return cookies
        .split(';')
        .map(cookie => cookie.trim())
        .reduce((acc, cookie) => {
        const [name, value] = cookie.split('=');
        acc[name] = decodeURIComponent(value);
        return acc;
        }, {});
    }

    useEffect(() => {
        fetchItems(selectedCategory);
    }, [selectedCategory]);

    useEffect(() => {
        if (searchQuery) {
            searchItems(searchQuery);
        } else {
            setFilteredItems([]);
        }
    }, [searchQuery]);
  
    const fetchItems = async (category) => {
        let endpoint = '';
        let type = '';
        switch (category) {
            case 'Fruits':
                endpoint = 'http://localhost:4000/api/fruits';
                type = 'fruits';
                break;
            case 'Vegetables':
                endpoint = 'http://localhost:4000/api/vegetables';
                type = 'vegetables';
                break;
            case 'Diary':
                endpoint = 'http://localhost:4000/api/dairyProducts';
                type = 'dairyProducts';
                break;
            case 'Meat':
                endpoint = 'http://localhost:4000/api/meats';
                type = 'meats';
                break;
            case 'Snacks':
                endpoint = 'http://localhost:4000/api/snacks';
                type = 'snacks';
                break;
            case 'Pulses':
                endpoint = 'http://localhost:4000/api/pulses';
                type = 'pulses';
                break;
            case 'Nuts':
                endpoint = 'http://localhost:4000/api/nuts';
                type = 'nuts';
                break;
            default:
                return;
        }
    
        try {
            const response = await axios.get(endpoint);
            const itemsWithType = response.data.map(item => ({
                ...item,
                type
            }));
            setItems(itemsWithType);
        } catch (error) {
            console.error(`Error fetching ${category}:`, error);
        }
    };

    const searchItems = async (query) => {
        try {
            const response = await axios.get(`http://localhost:4000/api/items/search?q=${query}`);
            setFilteredItems(response.data);
        } catch (error) {
            console.error('Error searching items:', error);
        }
    };
  
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setSearchQuery('');
        setFilteredItems([]);
    };

    const handleAddToCart = async (item) => {

        const cookies = parseCookies(document.cookie);
        const token = cookies.token;
        const quantity = itemCounts[item._id] || 1;

        const existingCartItem = cart.find(cartItem => cartItem.id === item._id);
        let updatedCart;

        if (existingCartItem) {
            updatedCart = cart.map(cartItem =>
                cartItem.id === item._id
                    ? { ...cartItem, quantity: cartItem.quantity + quantity }
                    : cartItem
            );
        } else {
            updatedCart = [
                ...cart,
                {
                    id: item._id,
                    name: item.name,
                    price: item.price,
                    unit: item.unit,
                    type: item.type,
                    image: item.image,
                    quantity: quantity
                }
            ];
        }

        try {
            const response = await axios.post('http://localhost:4000/api/users/add-to-cart', { cart: updatedCart }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setCart(response.data.cart);
            console.log('Item added to cart:', response.data);
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    const handleIncrement = async (itemId) => {
        const updatedCart = cart.map(cartItem =>
            cartItem.id === itemId
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
        setCart(updatedCart);
        await updateCartInDatabase(updatedCart);
    };

    const handleDecrement = async (itemId) => {
        const updatedCart = cart
            .map(cartItem =>
                cartItem.id === itemId
                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem
            )
            .filter(cartItem => cartItem.quantity > 0);
        setCart(updatedCart);
        await updateCartInDatabase(updatedCart);
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

    

    const displayedItems = filteredItems.length > 0 ? filteredItems : items;
    console.log(displayedItems);


    return (
        <div>
            <DashboardNavbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <div className="dashboard-container">
                <div className='options-container'>
                    <h3 className='user-name-font'>Welcome, {currentUser ? currentUser.firstName : 'Loading...'}</h3>
                    <h3>Categories</h3>
                    <div className="circle-container">
                        <div className='category-container' onClick={() => handleCategoryClick('Fruits')}>
                            <div className="circle" style={{ backgroundImage: `url(${Fruits})` }}>
                            </div>
                            <span>Fruits</span>
                        </div>
                        <div className='category-container' onClick={() => handleCategoryClick('Vegetables')}>
                            <div className="circle" style={{ backgroundImage: `url(${Vegies})` }}>
                            </div>
                            <span>Vegetables</span>
                        </div>
                        <div className='category-container' onClick={() => handleCategoryClick('Diary')}>
                            <div className="circle" style={{ backgroundImage: `url(${Diary})` }}>
                            </div>
                            <span>Diary</span>
                        </div>
                        <div className='category-container' onClick={() => handleCategoryClick('Meat')}>
                            <div className="circle" style={{ backgroundImage: `url(${Meat})` }}>
                            </div>
                            <span>Meat</span>
                        </div>
                        <div className='category-container' onClick={() => handleCategoryClick('Snacks')}>
                            <div className="circle" style={{ backgroundImage: `url(${Snack})` }}>
                            </div>
                            <span>Snacks</span>
                        </div>
                        <div className='category-container' onClick={() => handleCategoryClick('Pulses')}>
                            <div className="circle" style={{ backgroundImage: `url(${Pulses})` }}>
                            </div>
                            <span>Pulses</span>
                        </div>
                        <div className='category-container' onClick={() => handleCategoryClick('Nuts')}>
                            <div className="circle" style={{ backgroundImage: `url(${Nuts})` }}>
                            </div>
                            <span>Nuts</span>
                        </div>
                    </div>
                </div>
                <div className='item-container'>
                    <div className='item-heading'>
                        {/* <h4>{selectedCategory}</h4>
                         */}
                          <h4>{filteredItems.length > 0 ? `Search Results for "${searchQuery}"` : selectedCategory}</h4>
                    
                    </div>
                    <div className='item-grid'>
                    {displayedItems.map(item => {
                            const isInCart = cart.some(cartItem => cartItem.id === item._id);
                            const itemInCart = cart.find(cartItem => cartItem.id === item._id) || {};

                            return (
                                <div key={item._id} className='item-card'>
                                    <div className='item-image' style={{ backgroundImage: `url('http://localhost:4000/uploads/${item.image}')` }}></div>
                                    <div className='item-details'>
                                        <div className='item-header'>
                                            <h4 className='item-name'>{item.name}</h4>
                                            <p className='item-price'>${item.price} {item.unit}</p>
                                        </div>
                                        <p className='item-description'>{item.description}</p>
                                        {isInCart && itemInCart.quantity > 0 ? (
                                            <div className='quantity-controls'>
                                                <button onClick={() => handleDecrement(item._id)}>-</button>
                                                <span>{itemInCart.quantity}</span>
                                                <button onClick={() => handleIncrement(item._id)}>+</button>
                                            </div>
                                        ) : (
                                            <button className='add-to-cart-button' onClick={() => handleAddToCart(item)}>Add to Cart</button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                        {/* {items.map(item => {
                            const isInCart = cart.some(cartItem => cartItem.id === item._id);
                            const itemInCart = cart.find(cartItem => cartItem.id === item._id) || {};

                            return (
                                <div key={item._id} className='item-card'>
                                    <div className='item-image' style={{ backgroundImage: `url('http://localhost:4000/uploads/${item.image}')` }}></div>
                                    <div className='item-details'>
                                        <div className='item-header'>
                                            <h4 className='item-name'>{item.name}</h4>
                                            <p className='item-price'>${item.price} {item.unit}</p>
                                        </div>
                                        <p className='item-description'>{item.description}</p>
                                        {isInCart && itemInCart.quantity > 0 ? (
                                            <div className='quantity-controls'>
                                                <button onClick={() => handleDecrement(item._id)}>-</button>
                                                <span>{itemInCart.quantity}</span>
                                                <button onClick={() => handleIncrement(item._id)}>+</button>
                                            </div>
                                        ) : (
                                            <button className='add-to-cart-button' onClick={() => handleAddToCart(item)}>Add to Cart</button>
                                        )}
                                    </div>
                                </div>
                            );
                        })} */}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
