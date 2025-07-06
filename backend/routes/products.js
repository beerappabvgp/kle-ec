const express = require('express');
const {
    createProduct,
    getAllProducts,
    getProduct,
    getProductDetails,
    updateProduct,
    deleteProduct,
    hardDeleteProduct,
    rateProduct,
    getReviews,
    addOrUpdateReview,
    deleteReview
} = require('../controllers/productController');
const auth = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.get('/:id/reviews', getReviews);

// Protected routes
router.use(auth);

router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.post('/:id/rate', rateProduct);
router.post('/:id/reviews', addOrUpdateReview);
router.delete('/:id/reviews/:reviewId', deleteReview);

module.exports = router; 