import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderPlacedPage = () => {
    const location = useLocation();
    const orderData = location.state; // Retrieve the order data passed from the CheckoutPage

    // Use `navigate` to navigate back to the home page
    const navigate = useNavigate();

    return (
        <div className="container mx-auto py-20 text-center">
            <h1 className="text-4xl font-extrabold mb-12 text-green-600">Order Placed Successfully!</h1>
            
            <div className="mx-auto max-w-3xl mb-12 p-8 rounded-xl bg-blue-200 shadow-lg text-left">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Order Summary</h2>
                <div className="mb-4 flex justify-between">
                    <span className="font-semibold text-gray-700">Order ID:</span>
                    <span className="text-gray-900">{orderData.id}</span>
                </div>
                <div className="mb-4 flex justify-between">
                    <span className="font-semibold text-gray-700">Name:</span>
                    <span className="text-gray-900">{orderData.name}</span>
                </div>
                <div className="mb-4 flex justify-between">
                    <span className="font-semibold text-gray-700">Shipping Address:</span>
                    <span className="text-gray-900">{orderData.shipping_address}</span>
                </div>
                <div className="mb-4 flex justify-between">
                    <span className="font-semibold text-gray-700">Subtotal:</span>
                    <span className="text-gray-900">BDT {orderData.subtotal}</span>
                </div>
                {orderData.discount > 0 && (
                    <div className="mb-4 flex justify-between">
                        <span className="font-semibold text-gray-700">Discount:</span>
                        <span className="text-gray-900">BDT {orderData.discount}</span>
                    </div>
                )}
                <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Grand Total:</span>
                    <span className="text-gray-900">BDT {orderData.grandtotal}</span>
                </div>
            </div>

            <div className="mx-auto max-w-3xl mb-12">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Thank You for Your Order!</h2>
                <p className="mb-6 text-gray-600">Your order has been placed successfully. We will notify you when your order is on its way.</p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-green-500 text-white py-3 px-8 rounded-full font-semibold transition duration-300 hover:bg-green-600"
                >
                    Return to Home
                </button>
            </div>

            {/* New Section: Customer Satisfaction */}
            <div className="mx-auto max-w-3xl mb-12 p-8 rounded-xl bg-white shadow-lg text-center">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">We Value You!</h2>
                <p className="text-gray-700">
                    We hope you enjoy our products! Your satisfaction is our priority. Please contact us if you need any assistance.
                </p>
            </div>
        </div>
    );
};

export default OrderPlacedPage;
