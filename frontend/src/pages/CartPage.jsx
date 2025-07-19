import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { useToast } from '../components/Toast';

export default function CartPage() {
    const { cart, loading, error, updateCartItem, removeCartItem, clearCart } = useCart();
    const { showSuccess, showError, showWarning } = useToast();

    const handleQuantityChange = (productId, value) => {
        const quantity = parseInt(value, 10);
        if (quantity > 0) {
            updateCartItem(productId, quantity);
            showSuccess('Cart Updated', 'Item quantity has been updated successfully.');
        }
    };

    const handleRemoveItem = (productId) => {
        removeCartItem(productId);
        showSuccess('Item Removed', 'Item has been removed from your cart.');
    };

    const handleClearCart = () => {
        if (window.confirm('Are you sure you want to clear your cart?')) {
            clearCart();
            showSuccess('Cart Cleared', 'Your cart has been cleared successfully.');
        }
    };

    const total = cart?.items?.reduce((sum, item) => sum + (item.product.price * item.quantity), 0) || 0;

    return (
        <div className="min-h-screen w-full bg-white dark:bg-black text-black dark:text-white py-6 px-2 sm:px-4">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 dark:text-white">My Cart</h1>
                {loading ? (
                    <div className="text-center py-10 text-lg">Loading cart...</div>
                ) : error ? (
                    <div className="text-center text-red-500 py-10">{error}</div>
                ) : !cart || !cart.items || cart.items.length === 0 ? (
                    <div className="text-center py-10 text-lg">Your cart is empty.</div>
                ) : (
                    <>
                        <div className="space-y-6 mb-10">
                            {cart.items.map(item => (
                                <div key={item.product._id} className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-lg p-5 group hover:shadow-xl transition-all">
                                    {/* Left: Image + Info + Qty */}
                                    <div className="flex items-center gap-4 w-full sm:w-auto flex-1">
                                        {item.product.images && item.product.images.length > 0 ? (
                                            <img src={item.product.images[0]} alt={item.product.name} className="w-20 h-20 object-cover rounded-xl bg-white dark:bg-black shadow-sm" />
                                        ) : (
                                            <div className="w-20 h-20 flex items-center justify-center rounded-xl bg-white dark:bg-black text-black dark:text-white opacity-40">No Image</div>
                                        )}
                                        <div className="flex flex-col gap-2 min-w-0">
                                            <div className="font-semibold text-lg dark:text-white truncate max-w-[140px]">{item.product.name}</div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Qty:</span>
                                                <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-1 shadow-sm">
                                                    <button
                                                        className="px-2 py-1 text-lg font-bold text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
                                                        onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                    >-</button>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={item.quantity}
                                                        onChange={e => handleQuantityChange(item.product._id, e.target.value)}
                                                        className="w-10 text-center bg-transparent border-none focus:ring-0 text-base font-semibold"
                                                    />
                                                    <button
                                                        className="px-2 py-1 text-lg font-bold text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
                                                        onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                                                    >+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Right: Price + Remove */}
                                    <div className="flex flex-col items-end gap-3 min-w-[110px] sm:min-w-[140px]">
                                        <div className="text-blue-600 dark:text-blue-400 font-bold text-lg whitespace-nowrap">${item.product.price}</div>
                                        <button onClick={() => handleRemoveItem(item.product._id)} className="bg-red-500 hover:bg-red-600 text-white rounded-full px-4 py-1.5 text-sm font-medium shadow-sm transition-transform">Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-8">
                            <div className="flex-1 flex flex-col items-center sm:items-start">
                                <div className="text-xl font-bold dark:text-white mb-2">Total: <span className="text-blue-600 dark:text-blue-400">${total.toFixed(2)}</span></div>
                                <button onClick={handleClearCart} className="mt-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-6 py-2 rounded-full font-medium hover:bg-gray-200 dark:hover:bg-gray-700 shadow-sm transition-all">Clear Cart</button>
                            </div>
                            <Link to="/checkout" className="btn-primary rounded-full py-3 px-8 text-lg font-semibold shadow hover:scale-105 transition-transform text-center w-full sm:w-auto">Proceed to Checkout</Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
} 