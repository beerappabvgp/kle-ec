const express = require('express');
const authRoutes = require('./auth');
const userRoutes = require('./users');
const productRoutes = require('./products');
const cartRoutes = require('./cart');
const orderRoutes = require('./orders');

const router = express.Router();

// Auth routes
router.use('/auth', authRoutes);

// User management routes (admin only)
router.use('/users', userRoutes);

// Product routes
router.use('/products', productRoutes);

// Cart routes
router.use('/cart', cartRoutes);

// Order routes
router.use('/orders', orderRoutes);

module.exports = router;