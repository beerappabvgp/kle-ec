import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserOrders } from '../api/orders';

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchOrders() {
            setLoading(true);
            try {
                const res = await getUserOrders();
                setOrders(res.data || []);
            } catch (err) {
                setError('Failed to load orders');
            } finally {
                setLoading(false);
            }
        }
        fetchOrders();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'text-yellow-600 dark:text-yellow-400';
            case 'processing': return 'text-blue-600 dark:text-blue-400';
            case 'shipped': return 'text-purple-600 dark:text-purple-400';
            case 'delivered': return 'text-green-600 dark:text-green-400';
            case 'cancelled': return 'text-red-600 dark:text-red-400';
            default: return 'text-black dark:text-white';
        }
    };

    const getPaymentStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'text-green-600 dark:text-green-400';
            case 'pending': return 'text-yellow-600 dark:text-yellow-400';
            case 'failed': return 'text-red-600 dark:text-red-400';
            default: return 'text-black dark:text-white';
        }
    };

    return (
        <div className="min-h-screen w-full bg-white dark:bg-black text-black dark:text-white py-10 px-2 sm:px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 dark:text-white">My Orders</h1>

                {loading ? (
                    <div className="text-center py-10 text-lg">Loading orders...</div>
                ) : error ? (
                    <div className="text-center text-red-500 py-10">{error}</div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-10">
                        <h2 className="text-xl font-bold mb-4">No orders yet</h2>
                        <Link to="/products" className="btn-primary">Start Shopping</Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map(order => (
                            <div key={order._id} className="bg-white dark:bg-black shadow-md rounded-lg p-4 sm:p-6 border border-black dark:border-white">
                                <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2 sm:gap-0">
                                    <div>
                                        <h3 className="text-lg font-bold dark:text-white">Order #{order._id.slice(-8)}</h3>
                                        <p className="text-sm text-black dark:text-white">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className={`font-bold ${getStatusColor(order.orderStatus)}`}>
                                            {order.orderStatus.toUpperCase()}
                                        </div>
                                        <div className={`text-sm ${getPaymentStatusColor(order.paymentStatus)}`}>
                                            Payment: {order.paymentStatus.toUpperCase()}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-4">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
                                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                                {item.product.images && item.product.images.length > 0 ? (
                                                    <img
                                                        src={item.product.images[0]}
                                                        alt={item.product.name}
                                                        className="w-12 h-12 object-cover rounded bg-white dark:bg-black"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 flex items-center justify-center rounded bg-white dark:bg-black text-black dark:text-white opacity-40 text-xs">
                                                        No Image
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="font-medium dark:text-white">{item.product.name}</div>
                                                    <div className="text-sm text-black dark:text-white">Qty: {item.quantity}</div>
                                                </div>
                                            </div>
                                            <div className="font-bold text-blue-600 dark:text-blue-400 w-full sm:w-auto text-right">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-black dark:border-white pt-4">
                                    <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
                                        <span className="font-bold dark:text-white">Total:</span>
                                        <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                                            ${order.totalAmount.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                {order.shippingAddress && (
                                    <div className="mt-4 p-3 bg-white dark:bg-black border border-black dark:border-white rounded">
                                        <h4 className="font-bold mb-2 dark:text-white">Shipping Address:</h4>
                                        <div className="text-sm text-black dark:text-white">
                                            <div>{order.shippingAddress.name}</div>
                                            <div>{order.shippingAddress.address}</div>
                                            <div>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</div>
                                            <div>{order.shippingAddress.phone}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
} 