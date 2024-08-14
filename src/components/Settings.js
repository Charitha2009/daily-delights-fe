import React, { useState, useEffect } from 'react';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import General from './General';
import MyOrders from './MyOrders';
import '../Styles/Settings.css';
import DashboardNavbar from './DashboardNavbar';
import Penguin from '../Images/pengba.jpg';

const Settings = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === '/settings' || location.pathname === '/settings/') {
            navigate('/settings/general');
        }
    }, [location, navigate]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div>
            <DashboardNavbar />
            <div className="settings-container">
                <button className="toggle-button" onClick={toggleSidebar}>
                    ☰
                </button>
                <div className={`sidebar ${isSidebarOpen ? '' : 'closed'}`}>
                    <div className="navbar-profile">
                        <img src={Penguin} alt="Profile" className="profile-image" />
                    </div>
                    <ul>
                        <li>
                            <Link to="/settings/general" className={location.pathname === '/settings/general' ? 'active' : ''}>
                                General
                            </Link>
                        </li>
                        <li>
                            <Link to="/settings/my-orders" className={location.pathname === '/settings/my-orders' ? 'active' : ''}>
                                My Orders
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={`content ${isSidebarOpen ? 'expanded' : ''}`}>
                    <div className="right-container">
                        {location.pathname === '/settings/general' && <General />}
                        {location.pathname === '/settings/my-orders' && <MyOrders />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
