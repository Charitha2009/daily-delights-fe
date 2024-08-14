// Home.js
import React from 'react';
import Navbar from './Navbar';
import '../Styles/Home.css';
import Image1 from '../Images/vegies.webp';
import Image2 from '../Images/diary.webp';
import Image3 from '../Images/meat.jpeg';
import Image4 from '../Images/nuts.png';
import Image5 from '../Images/chips.jpeg';
import Image6 from '../Images/pulses.avif';


const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="home-container">
      <div className="left-half">
          <div className="image-grid">
            <img src={Image1} className= 'display-grid-item' alt="Product 1" />
            <img src={Image2} className= 'display-grid-item' alt="Product 1" />
            <img src={Image3} className= 'display-grid-item' alt="Product 1" />
            <img src={Image4} className= 'display-grid-item' alt="Product 1" />
            <img src={Image5} className= 'display-grid-item' alt="Product 1" />
            <img src={Image6} className= 'display-grid-item' alt="Product 1" />
          </div>
        </div>
        <div className="right-half">
            <p>Hi all,</p>
            <p>We have got the following on our menu:</p>
            <p>Daily Produce</p>
            <p>Dairy</p>
            <p>Fresh meat</p>
            <p>Snack bar</p>
            <p>Cereals &  pulses</p>
            <p>Order your favorites instantly!!</p>
          {/* You can add any additional content or images here */}
        </div>
      </div>
    </div>
  );
};

export default Home;
