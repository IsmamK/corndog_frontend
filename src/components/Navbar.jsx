import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cart from './Cart'; // Import the Cart component

const Navbar = ({ cartDetails }) => {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [reloadNavbar, setReloadNavbar] = useState(false); 

  const navigateToCart = () => {
    setIsCartOpen(true);
  };

  useEffect(() => {
    setReloadNavbar(false)
  
    console.log("Navbar reloaded!"); // For demonstration purposes
  }, [reloadNavbar]);

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const cartItemCount = cartDetails ? calculateCartItemCount(cartDetails) : 0;

  return (
    
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <a href="/">
          <img src="corndog-icon.gif" alt="Corndog" className="h-10 w-10" />
        </a>
        <a href="/" className="text-white font-bold">
          The CornDog Company
        </a>
      </div>
      <div className="flex items-center space-x-4 mr-10">
        <button onClick={navigateToCart}>
          <img
            src="/cart-icon.png"
            alt="Cart"
            className="h-6 w-6"
            style={{ filter: 'invert(100%)' }}
          />
        </button>
        <button onClick={navigateToCart}
          className="text-white font-bold bg-red-500 rounded-full h-8 w-8 flex items-center justify-center"
        >
          {cartItemCount}
        </button>
      </div>
      {isCartOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            {/* Render the Cart component */}
            <Cart cartDetails={cartDetails} isCartOpen={isCartOpen} setIsCartOpen = {setIsCartOpen}  reloadNavbar={ reloadNavbar} setReloadNavbar={setReloadNavbar}/>
            <button onClick={closeCart}>Close</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

const calculateCartItemCount = (cartDetails) => {
  let totalCount = 0;
  cartDetails.forEach((cart) => {
    totalCount += cart.cart_items.length;
  });
  return totalCount;
};
