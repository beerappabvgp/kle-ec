const productService = require('../services/productService');

// @desc    Create a new product
// @route   POST /api/products
// @access  Private
const createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body, req.user.id);

        res.status(201).json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all products with filtering and pagination
// @route   GET /api/products
// @access  Private
const getAllProducts = async (req, res) => {
    try {
        const result = await productService.getAllProducts(req.query);

        res.status(200).json({
            success: true,
            data: result.products,
            pagination: result.pagination
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Private
const getProduct = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get product details (for customers)
// @route   GET /api/products/:id/details
// @access  Private
const getProductDetails = async (req, res) => {
    try {
        const product = await productService.getProductDetails(req.params.id);

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = async (req, res) => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body, req.user.id);

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        const statusCode = error.message.includes('not found') ? 404 :
            error.message.includes('authorized') ? 403 : 400;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete product (soft delete)
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = async (req, res) => {
    try {
        const result = await productService.deleteProduct(req.params.id, req.user.id);

        res.status(200).json({
            success: true,
            message: result.message
        });
    } catch (error) {
        const statusCode = error.message.includes('not found') ? 404 :
            error.message.includes('authorized') ? 403 : 400;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Hard delete product (permanent)
// @route   DELETE /api/products/:id/hard
// @access  Private
const hardDeleteProduct = async (req, res) => {
    try {
        const result = await productService.hardDeleteProduct(req.params.id, req.user.id);

        res.status(200).json({
            success: true,
            message: result.message
        });
    } catch (error) {
        const statusCode = error.message.includes('not found') ? 404 :
            error.message.includes('authorized') ? 403 : 400;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Rate a product (add/update user rating)
// @route   POST /api/products/:id/rate
// @access  Private
const rateProduct = async (req, res) => {
    try {
        const ratingValue = req.body.rating;
        if (!ratingValue) throw new Error('Rating is required');
        const product = await productService.rateProduct(req.params.id, req.user.id, ratingValue);
        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProduct,
    getProductDetails,
    updateProduct,
    deleteProduct,
    hardDeleteProduct,
    rateProduct
}; 