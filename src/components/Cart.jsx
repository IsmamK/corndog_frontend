import React from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartDetails, isCartOpen, setIsCartOpen, setReloadNavbar }) => {
  const navigate = useNavigate();

  if (!cartDetails) {
    return <p>Loading cart...</p>;
  }

  if (cartDetails.length === 0) {
    return <p>Cart is empty</p>;
  }

  const handleCheckout = ()=>{
    setIsCartOpen(false)
    navigate('/checkout')
  }
  const handleClearCart = (cartId) => {
    fetch(`/api/delete_cart/${cartId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setIsCartOpen(false);
        setReloadNavbar(true);
        toast.success('Cart cleared successfully!', {
          position: 'top-right',
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        window.location.reload()
      })
      .catch((error) => {
        console.error('Error while clearing cart:', error);
      });
  };

  return (
    <div className="container mx-auto mt-10 mb-10">
      <h1 className="text-4xl font-bold text-center mb-8">Your Shopping Cart</h1>
      {cartDetails.map((cart) => (
        <div key={cart.id} className="bg-white rounded-lg shadow-lg mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <ul className="divide-y divide-gray-200">
              {cart.cart_items.map((item) => (
                <li key={item.cart_item_id} className="py-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="font-semibold">{item.product.title}</span>
                    <span className="text-gray-600 ml-2">x {item.quantity}</span>
                  </div>
                  <span className="font-semibold">BDT {item.total.toFixed(2)}</span> {/* Display BDT amount */}
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-4">
              <span className="font-semibold">Subtotal:</span>
              <span>BDT {cart.subtotal.toFixed(2)}</span> {/* Display BDT amount */}
            </div>
            <div className="flex justify-center mt-6">
              <button
                onClick={() => handleClearCart(cart.id)}
                className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-green-600 transition duration-300"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-center">
        <button
          onClick={handleCheckout}
          className="bg-blue-500 text-white py-3 px-8 rounded-full hover:bg-green-600 transition duration-300 flex items-center"
        >
          Discounts & Checkout <span className="ml-2">&#10132;</span>
        </button>
      </div>
    </div>
  );
};

export default Cart;
