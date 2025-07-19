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
            case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'processing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'shipped': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
            case 'delivered': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    const getPaymentStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return '⏳';
            case 'processing': return '⚙️';
            case 'shipped': return '📦';
            case 'delivered': return '✅';
            case 'cancelled': return '❌';
            default: return '📋';
        }
    };

    return (
        <div className="min-h-screen w-full bg-white dark:bg-black text-black dark:text-white py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-blue-600 dark:text-blue-400">
                        My Orders
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Track your order history and current status
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center gap-3 text-lg text-gray-600 dark:text-gray-400">
                            <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Loading orders...
                        </div>
                    </div>
                ) : error ? (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center gap-3 text-lg text-red-600 dark:text-red-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {error}
                        </div>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="max-w-md mx-auto">
                            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">No orders yet</h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">Start shopping to see your orders here</p>
                            <Link to="/products" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                <span>🛍️</span>
                                Start Shopping
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map(order => (
                            <div key={order._id} className="bg-white dark:bg-black rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                                {/* Order Header */}
                                <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-600 dark:to-blue-700 px-6 py-4">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                                <span className="text-white text-lg">📦</span>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-white">Order #{order._id.slice(-8)}</h3>
                                                <p className="text-blue-100 text-sm">
                                                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.orderStatus)}`}>
                                                <span>{getStatusIcon(order.orderStatus)}</span>
                                                {order.orderStatus.toUpperCase()}
                                            </span>
                                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(order.paymentStatus)}`}>
                                                <span>💳</span>
                                                Payment: {order.paymentStatus.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="p-6">
                                    <div className="space-y-4 mb-6">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
                                                <div className="flex-shrink-0">
                                                    {item.product.images && item.product.images.length > 0 ? (
                                                        <img
                                                            src={item.product.images[0]}
                                                            alt={item.product.name}
                                                            className="w-16 h-16 object-cover rounded-lg bg-white dark:bg-gray-800 shadow-sm"
                                                        />
                                                    ) : (
                                                        <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                                                        {item.product.name}
                                                    </h4>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        Quantity: {item.quantity}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        Price per unit: ${item.price.toFixed(2)}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-lg text-blue-600 dark:text-blue-400">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Order Total */}
                                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">Order Total:</span>
                                            <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                                                ${order.totalAmount.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Shipping Address */}
                                    {order.shippingAddress && (
                                        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="text-blue-600 dark:text-blue-400">📍</span>
                                                <h4 className="font-semibold text-gray-900 dark:text-white">Shipping Address</h4>
                                            </div>
                                            <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                                                <div className="font-medium">{order.shippingAddress.name}</div>
                                                <div>{order.shippingAddress.address}</div>
                                                <div>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</div>
                                                <div className="flex items-center gap-1">
                                                    <span>📞</span>
                                                    {order.shippingAddress.phone}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
} 