import React, { useState } from 'react';

const MenuItem = ({ id, name, description, price, image }) => {
  const [quantity, setQuantity] = useState(0);

  const addToCart = async () => {
    try {
      // Fetch cart data to get the cart_id
      const response = await fetch('/api/view_cart/');
      if (!response.ok) {
        throw new Error('Failed to fetch cart data');
      }
      const cartData = await response.json();
      const cartId = cartData[0].id; // Assuming the cart data is an array with one element
  
      // Prepare the request body
      const requestBody = {
        product_id: id, // Assuming id is the product ID passed as a prop
        cart_id: cartId,
        quantity: quantity
      };


  
      // Make the POST request to add the item to the cart
      const addToCartResponse = await fetch('/api/add_to_cart/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
  
      if (!addToCartResponse.ok) {
        throw new Error('Failed to add item to cart');
      }
  
      console.log(`Added ${quantity} ${name} to the cart`);
      window.location.reload()
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };
  

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity >= 5) {
      setQuantity(prevQuantity => prevQuantity - 1);
    } else {
      setQuantity(0);
    }
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-4 menu-item flex flex-col">
      <div className="relative flex-grow">
        <img src={image} alt={name} className="w-full h-48 object-cover rounded-lg" />
      </div>
      <div className="flex-grow">
        <h2 className="text-lg font-semibold mb-2">{name}</h2>
        <p className="text-gray-600 mb-2">{description}</p>
        <p className="text-gray-700 font-bold">Price: {price}</p>
      </div>
      <div className="flex items-center">
        <button onClick={decrementQuantity} className="bg-gray-300 text-gray-700 py-1 px-3 rounded-l-full hover:bg-gray-400">-</button>
        <span className="text-gray-700 px-3">{quantity}</span>
        <button onClick={incrementQuantity} className="bg-gray-300 text-gray-700 py-1 px-3 rounded-r-full hover:bg-gray-400">+</button>
        {quantity > 0 && <button onClick={addToCart} className="ml-4 bg-yellow-500 text-white py-2 px-4 rounded-full hover:bg-yellow-600 transition duration-300">Add to Cart</button>}
      </div>
    </div>
  );
};

export default MenuItem;
