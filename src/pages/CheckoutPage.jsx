import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = ({ cartDetails }) => {
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [flatNumber, setFlatNumber] = useState('');
  const [area, setArea] = useState('');
  const [roadStreet, setRoadStreet] = useState('');
  const [city] = useState('Dhaka'); // City is fixed at Dhaka
  const [discountApplied, setDiscountApplied] = useState(false);
  console.log('Checkout cartDetails:', cartDetails);
  
  if (!cartDetails) {
    return <p>Loading cart details...</p>;
}



  const handleApplyPromoCode = () => {
    fetch('/api/apply_discount_code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ discount_code: promoCode }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to apply promo code');
        }
        return response.json();
      })
      .then(() => {
        // Reset promoCode and indicate discount is applied
        setPromoCode('');
        setDiscountApplied(true);
        // Fetch updated cart details after applying discount code
        window.location.reload()
      })
      .catch(error => {
        console.error('Error applying promo code:', error);
        // Handle error appropriately, e.g., display an error message to the user
      });
  };

  
  const handleCheckout = () => {
    const shippingAddress = `${houseNumber ? `${houseNumber}, ` : ''}${flatNumber ? `${flatNumber}, ` : ''}${roadStreet ? `${roadStreet}, ` : ''}${area}, Dhaka`;

    const orderDetails = {
      name,
      shipping_address: shippingAddress,
      phone_number: phoneNumber,
     
    };

    // Make a POST request to the create_order endpoint
    fetch('/api/create_order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderDetails),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to place order');
        }
        return response.json();
      })
      .then(orderData => {
        // Navigate to OrderPlacedPage and pass order data as props
        navigate('/order-placed', { state: orderData });
      })
      .catch(error => {
        console.error('Error placing order:', error);
      });
  };
  

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>
      {discountApplied ? (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Discount Applied</h2>
          <p>Discount Code: {cartDetails[0].discount_code}</p>
          <p>Discount Amount: {cartDetails[0].discount}</p>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Apply Discount</h2>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="border border-gray-300 p-2 rounded-md flex-grow mr-4"
            />
            <button
              onClick={handleApplyPromoCode}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Apply
            </button>
          </div>
        </div>
      )}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        {cartDetails[0] && cartDetails[0].cart_items && (
  <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
    <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
    <>
      <ul className="divide-y divide-gray-200">
        {cartDetails[0].cart_items.map((item) => (
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
        <span>BDT {cartDetails[0].subtotal.toFixed(2)}</span> {/* Display total subtotal */}
      </div>

      {cartDetails[0].discount && ( // Check if discount information exists
              <div className="flex justify-between mt-4">
                <span className="font-semibold">Discount Applied:</span>
                <span>- BDT {cartDetails[0].discount.toFixed(2)}</span> {/* Display discount amount */}
              </div>
            )}
      <div className="flex justify-between mt-4">
        <span className="font-semibold">Grand Total:</span>
        <span>BDT {cartDetails[0].grandtotal.toFixed(2)}</span> {/* Display grand total */}
      </div>
    </>
  </div>
)}

      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Delivery Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-700 font-semibold mb-1">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phoneNumber" className="text-gray-700 font-semibold mb-1">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="houseNumber" className="text-gray-700 font-semibold mb-1">House Number</label>
            <input
              type="text"
              id="houseNumber"
              placeholder="House Number"
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
              className="border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="flatNumber" className="text-gray-700 font-semibold mb-1">Flat Number</label>
            <input
              type="text"
              id="flatNumber"
              placeholder="Flat Number"
              value={flatNumber}
              onChange={(e) => setFlatNumber(e.target.value)}
              className="border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="roadStreet" className="text-gray-700 font-semibold mb-1">Road/Street</label>
            <input
              type="text"
              id="roadStreet"
              placeholder="Road/Street"
              value={roadStreet}
              onChange={(e) => setRoadStreet(e.target.value)}
              className="border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="area" className="text-gray-700 font-semibold mb-1">Area</label>
            <input
              type="text"
              id="area"
              placeholder="Area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="border border-gray-300 p-2 rounded-md"
            />
          </div>
          <input
            type="text"
            value={city}
            disabled
            className="col-span-2 border border-gray-300 p-2 rounded-md bg-gray-100"
          />
        </div>
      </div>
      <button
        onClick={handleCheckout}
        className="bg-green-500 mb-24 text-white py-4 px-12 rounded-full hover:bg-green-600 transition duration-300 block mx-auto"
      >
        Place Order
      </button>
    </div>
  );
};

export default CheckoutPage;
