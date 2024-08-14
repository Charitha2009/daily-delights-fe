// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ProductList from './components/ProductList';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import DashboardNavbar from './components/DashboardNavbar';
import ManageProducts from './components/ManageProducts';
import Cart from './components/Cart';
import StripeCheckout from './components/StripeCheckout';
import General from './components/General';
import MyOrders from './components/MyOrders';
import Settings from './components/Settings';
import PaymentSuccess from './components/PaymentSuccess';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/dashboardNavbar' element={<DashboardNavbar/>}></Route>
      <Route path='/manageProducts' element={<ManageProducts/>}></Route>
      <Route path='/cart' element={<Cart/>}></Route>
      <Route path='/checkout' element={<StripeCheckout/>}></Route>
      <Route path="/settings/*" element={<Settings />} />
      <Route path="/success" element={<PaymentSuccess />} />
      {/* <Route path="/settings/my-orders" element={<MyOrders />} /> */}
    </Routes>
  </Router>
);

export default App;
