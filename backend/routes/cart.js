const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const cartController = require('../controllers/cartController');

router.use(auth);

router.post('/add', cartController.addToCart);
router.get('/', cartController.getCart);
router.put('/update', cartController.updateCartItem);
router.delete('/remove/:productId', cartController.removeCartItem);
router.delete('/clear', cartController.clearCart);

module.exports = router; 