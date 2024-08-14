import React, { useState } from 'react';
import '../Styles/General.css';

const General = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Process form data here, e.g., send to API or update state
        console.log('Form submitted:', formData);
    };

    return (
        <div className="general-container">
            <h2>General Settings</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">FIRST NAME</label>
                    <input 
                        type="text" 
                        id="firstName" 
                        name="firstName" 
                        value={formData.firstName} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">LAST NAME</label>
                    <input 
                        type="text" 
                        id="lastName" 
                        name="lastName" 
                        value={formData.lastName} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dob">DATE OF BIRTH</label>
                    <input 
                        type="date" 
                        id="dob" 
                        name="dob" 
                        value={formData.dob} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">EMAIL</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default General;
