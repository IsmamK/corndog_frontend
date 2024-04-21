import React, { useState,useEffect } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider,useNavigate } from "react-router-dom";
import MainLayout from './layout/MainLayout.jsx';
import Homepage from './pages/Homepage.jsx';
import Navbar from './components/Navbar.jsx';
import Cart from './components/Cart.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import OrderPlacedPage from './pages/OrderPlacedPage.jsx';

const App = () => {
  const [cartDetails, setCartDetails] = useState(null);

  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        const response = await fetch('/api/view_cart/');
        if (!response.ok) {
          throw new Error('Failed to fetch cart details');
        }
        const data = await response.json();
        setCartDetails(data);
      } catch (error) {
        console.error('Error fetching cart details:', error);
      }
    };

    fetchCartDetails();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout cartDetails={cartDetails}/>}>
        <Route path="/" element={<Homepage  />} />
        <Route path="/checkout" element={<CheckoutPage cartDetails={cartDetails} />} /> {/* Route for checkout page with cart ID */}
        <Route path="/order-placed" element = {<OrderPlacedPage/>}/>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
