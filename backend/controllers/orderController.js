const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
    key_id: 'rzp_test_BXLNYqQDMH2FeP',
    key_secret: '7oShe6UdRf7kSzjsbePYj7KZ'
});

// Create Razorpay order
const createPaymentOrder = async (req, res) => {
    try {
        const { amount, currency = 'INR' } = req.body;

        console.log('Creating payment order:', { amount, currency });

        const options = {
            amount: amount * 100, // Razorpay expects amount in paise
            currency,
            receipt: 'order_' + Date.now()
        };

        console.log('Razorpay options:', options);

        const order = await razorpay.orders.create(options);

        console.log('Razorpay order created:', order);

        res.status(200).json({
            success: true,
            data: {
                orderId: order.id,
                amount: order.amount,
                currency: order.currency
            }
        });
    } catch (error) {
        console.error('Error creating payment order:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to create payment order'
        });
    }
};

// Verify payment and create order
const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, shippingAddress } = req.body;

        // Verify payment signature
        const text = razorpay_order_id + '|' + razorpay_payment_id;
        const crypto = require('crypto');
        const signature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_KEY)
            .update(text)
            .digest('hex');

        if (signature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: 'Invalid payment signature'
            });
        }

        // Get user's cart
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Cart is empty'
            });
        }

        // Calculate total
        const totalAmount = cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

        // Create order
        const orderItems = cart.items.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price
        }));

        const order = await Order.create({
            user: req.user.id,
            items: orderItems,
            totalAmount,
            paymentStatus: 'completed',
            paymentId: razorpay_payment_id,
            shippingAddress
        });

        // Clear cart
        cart.items = [];
        await cart.save();

        res.status(201).json({
            success: true,
            data: order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get user's orders
const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .populate('items.product')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get single order
const getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('items.product')
            .populate('user', 'name email');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        // Check if user owns this order
        if (order.user._id.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view this order'
            });
        }

        res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update order status (admin only)
const updateOrderStatus = async (req, res) => {
    try {
        const { orderStatus } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        order.orderStatus = orderStatus;
        order.updatedAt = Date.now();
        await order.save();

        res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createPaymentOrder,
    verifyPayment,
    getUserOrders,
    getOrder,
    updateOrderStatus
}; 