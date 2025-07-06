import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createPaymentOrder, verifyPayment } from '../api/orders';

export default function CheckoutPage() {
    const { cart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [shippingAddress, setShippingAddress] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phone: ''
    });

    const total = cart?.items?.reduce((sum, item) => sum + (item.product.price * item.quantity), 0) || 0;

    const handleAddressChange = (e) => {
        setShippingAddress({
            ...shippingAddress,
            [e.target.name]: e.target.value
        });
    };

    const handlePayment = async () => {
        if (!cart || cart.items.length === 0) {
            setError('Your cart is empty');
            return;
        }

        // Validate shipping address
        const requiredFields = ['name', 'address', 'city', 'state', 'zipCode', 'phone'];
        const missingFields = requiredFields.filter(field => !shippingAddress[field]);
        if (missingFields.length > 0) {
            setError('Please fill in all shipping address fields');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Create Razorpay order
            const paymentOrder = await createPaymentOrder(total);

            // Initialize Razorpay
            const options = {
                key: 'rzp_test_BXLNYqQDMH2FeP',
                amount: paymentOrder.data.amount,
                currency: paymentOrder.data.currency,
                name: 'ShopEase',
                description: 'Order Payment',
                order_id: paymentOrder.data.orderId,
                handler: async function (response) {
                    try {
                        // Verify payment
                        await verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            shippingAddress
                        });

                        // Redirect to orders page
                        navigate('/orders');
                    } catch (err) {
                        setError('Payment verification failed');
                    }
                },
                prefill: {
                    name: shippingAddress.name,
                    contact: shippingAddress.phone
                },
                theme: {
                    color: '#3B82F6'
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            setError('Failed to create payment order');
        } finally {
            setLoading(false);
        }
    };

    if (!cart || cart.items.length === 0) {
        return (
            <div className="min-h-screen w-full bg-white dark:bg-black text-black dark:text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                    <button onClick={() => navigate('/products')} className="btn-primary">
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-white dark:bg-black text-black dark:text-white py-6 px-2 sm:px-4">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 dark:text-white">Checkout</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Shipping Address */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 flex flex-col gap-6 border border-gray-100 dark:border-gray-800">
                        <h2 className="text-xl font-bold mb-2 dark:text-white">Shipping Address</h2>
                        {error && <div className="text-red-500 mb-4 text-sm font-medium px-4 py-2 bg-red-50 dark:bg-red-900/30 rounded-lg">{error}</div>}
                        <div className="space-y-4">
                            <div>
                                <label className="block mb-1 font-medium dark:text-white">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={shippingAddress.name}
                                    onChange={handleAddressChange}
                                    className="input-field rounded-full px-4 py-2 text-base"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium dark:text-white">Address</label>
                                <textarea
                                    name="address"
                                    value={shippingAddress.address}
                                    onChange={handleAddressChange}
                                    className="input-field rounded-2xl px-4 py-2 text-base min-h-[60px]"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-1 font-medium dark:text-white">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={shippingAddress.city}
                                        onChange={handleAddressChange}
                                        className="input-field rounded-full px-4 py-2 text-base"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium dark:text-white">State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={shippingAddress.state}
                                        onChange={handleAddressChange}
                                        className="input-field rounded-full px-4 py-2 text-base"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-1 font-medium dark:text-white">ZIP Code</label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={shippingAddress.zipCode}
                                        onChange={handleAddressChange}
                                        className="input-field rounded-full px-4 py-2 text-base"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium dark:text-white">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={shippingAddress.phone}
                                        onChange={handleAddressChange}
                                        className="input-field rounded-full px-4 py-2 text-base"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Order Summary */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 flex flex-col gap-6 border border-gray-100 dark:border-gray-800 h-fit sticky top-24">
                        <h2 className="text-xl font-bold mb-2 dark:text-white">Order Summary</h2>
                        <div className="space-y-4 mb-4">
                            {cart.items.map(item => (
                                <div key={item.product._id} className="flex justify-between items-center text-base">
                                    <div className="flex items-center gap-3">
                                        {item.product.images && item.product.images.length > 0 ? (
                                            <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-12 object-cover rounded-xl bg-white dark:bg-black shadow-sm" />
                                        ) : (
                                            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white dark:bg-black text-black dark:text-white opacity-40 text-xs">No Image</div>
                                        )}
                                        <span className="truncate max-w-[120px] font-medium">{item.product.name}</span>
                                        <span className="text-xs text-gray-400">x{item.quantity}</span>
                                    </div>
                                    <span className="font-semibold text-blue-600 dark:text-blue-400">${(item.product.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-2 flex justify-between items-center text-lg font-bold">
                            <span>Total:</span>
                            <span className="text-2xl text-blue-600 dark:text-blue-400">${total.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={handlePayment}
                            disabled={loading}
                            className="btn-primary w-full rounded-full py-3 text-lg font-semibold shadow hover:scale-105 transition-transform mt-4"
                        >
                            {loading ? 'Processing...' : 'Proceed to Payment'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 