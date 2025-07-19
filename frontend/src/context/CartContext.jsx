import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    addToCart as apiAddToCart,
    getCart as apiGetCart,
    updateCartItem as apiUpdateCartItem,
    removeCartItem as apiRemoveCartItem,
    clearCart as apiClearCart
} from '../api/cart';
import { useAuth } from './AuthContext';
import { getErrorMessage } from '../utils/errorHandler';

const CartContext = createContext();

export function CartProvider({ children }) {
    const { token } = useAuth();
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [toastCallback, setToastCallback] = useState(null);

    async function refreshCart() {
        if (!token) {
            setCart(null);
            return;
        }
        setLoading(true);
        setError('');
        try {
            const res = await apiGetCart();
            setCart(res.data);
        } catch (err) {
            console.error('Error loading cart:', err);
            const errorInfo = getErrorMessage(err);
            setError(errorInfo.message);
            if (toastCallback) {
                toastCallback.showError('Failed to Load Cart', errorInfo.message);
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        refreshCart();
        // eslint-disable-next-line
    }, [token]);

    // Optimistic add to cart
    async function addToCart(productId, quantity = 1) {
        setError('');
        let prevCart = cart ? { ...cart, items: [...cart.items] } : null;
        let updated = false;
        if (cart && cart.items) {
            const idx = cart.items.findIndex(item => item.product._id === productId);
            if (idx > -1) {
                // Optimistically update quantity
                const newItems = cart.items.map(item =>
                    item.product._id === productId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
                setCart({ ...cart, items: newItems });
                updated = true;
            }
        }
        try {
            await apiAddToCart(productId, quantity);
            if (!updated) await refreshCart();
            if (toastCallback) {
                toastCallback.showSuccess('Added to Cart', 'Product has been added to your cart successfully.');
            }
        } catch (err) {
            const errorInfo = getErrorMessage(err);
            setError(errorInfo.message);
            if (prevCart) setCart(prevCart);
            if (toastCallback) {
                toastCallback.showError('Failed to Add to Cart', errorInfo.message);
            }
        }
    }

    // Optimistic update quantity
    async function updateCartItem(productId, quantity) {
        setError('');
        let prevCart = cart ? { ...cart, items: [...cart.items] } : null;
        const newItems = cart.items.map(item =>
            item.product._id === productId ? { ...item, quantity } : item
        );
        setCart({ ...cart, items: newItems });
        try {
            await apiUpdateCartItem(productId, quantity);
        } catch (err) {
            setError('Failed to update cart item');
            if (prevCart) setCart(prevCart);
        }
    }

    // Optimistic remove
    async function removeCartItem(productId) {
        setError('');
        let prevCart = cart ? { ...cart, items: [...cart.items] } : null;
        const newItems = cart.items.filter(item => item.product._id !== productId);
        setCart({ ...cart, items: newItems });
        try {
            await apiRemoveCartItem(productId);
        } catch (err) {
            setError('Failed to remove cart item');
            if (prevCart) setCart(prevCart);
        }
    }

    // Optimistic clear
    async function clearCart() {
        setError('');
        let prevCart = cart ? { ...cart, items: [...cart.items] } : null;
        setCart({ ...cart, items: [] });
        try {
            await apiClearCart();
        } catch (err) {
            setError('Failed to clear cart');
            if (prevCart) setCart(prevCart);
        }
    }

    return (
        <CartContext.Provider value={{
            cart,
            loading,
            error,
            addToCart,
            updateCartItem,
            removeCartItem,
            clearCart,
            refreshCart,
            setToastCallback
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
} 