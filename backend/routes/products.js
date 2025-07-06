const express = require('express');
const {
    createProduct,
    getAllProducts,
    getProduct,
    getProductDetails,
    updateProduct,
    deleteProduct,
    hardDeleteProduct,
    rateProduct
} = require('../controllers/productController');
const auth = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(auth);

// Product routes
router.route('/')
    .get(getAllProducts)
    .post(createProduct);

router.route('/:id')
    .get(getProduct)
    .put(updateProduct)
    .delete(deleteProduct);

// Product details route (for customers)
router.get('/:id/details', getProductDetails);

// Hard delete route
router.delete('/:id/hard', hardDeleteProduct);

// Rate a product
router.post('/:id/rate', rateProduct);

module.exports = router; 