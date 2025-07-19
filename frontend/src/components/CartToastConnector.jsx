import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from './Toast';

export default function CartToastConnector() {
    const { setToastCallback } = useCart();
    const toast = useToast();

    useEffect(() => {
        setToastCallback(toast);
    }, [setToastCallback, toast]);

    return null; // This component doesn't render anything
} 