const Product = require('../models/Product');

function validateProductData(data) {
    const { name, description, price, category, images } = data;

    if (!name || !description || !price || !category || !images) {
        throw new Error('Name, description, price, category, and images are required');
    }

    if (name.length > 100) throw new Error('Name cannot exceed 100 characters');
    if (description.length > 1000) throw new Error('Description cannot exceed 1000 characters');
    if (price < 0) throw new Error('Price cannot be negative');
    if (!Array.isArray(images) || images.length === 0) {
        throw new Error('At least one image is required');
    }

    // Validate image URLs
    const urlRegex = /^https?:\/\/.+/;
    for (const image of images) {
        if (!urlRegex.test(image)) {
            throw new Error('Invalid image URL format');
        }
    }
}

function generateSKU() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `SKU-${timestamp}-${random}`.toUpperCase();
}

async function createProduct(productData, userId) {
    validateProductData(productData);

    // Generate unique SKU if not provided
    if (!productData.sku) {
        productData.sku = generateSKU();
    } else {
        // Check if SKU already exists
        const existingProduct = await Product.findOne({ sku: productData.sku });
        if (existingProduct) {
            throw new Error('SKU already exists');
        }
    }

    const product = await Product.create({
        ...productData,
        createdBy: userId
    });

    return await Product.findById(product._id).populate('createdBy', 'name email');
}

async function getAllProducts(query = {}) {
    const {
        page = 1,
        limit = 10,
        search,
        category,
        brand,
        minPrice,
        maxPrice,
        isActive,
        isFeatured,
        sortBy = 'createdAt',
        sortOrder = 'desc'
    } = query;

    const filter = {};

    // Search filter
    if (search) {
        filter.$or = [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { brand: { $regex: search, $options: 'i' } }
        ];
    }

    // Category filter
    if (category) {
        filter.category = { $regex: category, $options: 'i' };
    }

    // Brand filter
    if (brand) {
        filter.brand = { $regex: brand, $options: 'i' };
    }

    // Price range filter
    if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = parseFloat(minPrice);
        if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    // Active filter
    if (isActive !== undefined) {
        filter.isActive = isActive === 'true';
    } else {
        filter.isActive = true;
    }

    // Featured filter
    if (isFeatured !== undefined) {
        filter.isFeatured = isFeatured === 'true';
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const products = await Product.find(filter)
        .populate('createdBy', 'name email')
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit));

    const total = await Product.countDocuments(filter);

    return {
        products,
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            pages: Math.ceil(total / parseInt(limit))
        }
    };
}

async function getProductById(productId) {
    const product = await Product.findById(productId)
        .populate('createdBy', 'name email');

    if (!product) {
        throw new Error('Product not found');
    }

    return product;
}

async function getProductDetails(productId) {
    const product = await Product.findById(productId)
        .populate('createdBy', 'name email');

    if (!product) {
        throw new Error('Product not found');
    }

    if (!product.isActive) {
        throw new Error('Product is not available');
    }

    // Calculate discounted price
    const discountedPrice = product.originalPrice
        ? product.originalPrice * (1 - product.discountPercentage / 100)
        : product.price;

    return {
        ...product.toObject(),
        discountedPrice: Math.round(discountedPrice * 100) / 100
    };
}

async function updateProduct(productId, updateData, userId) {
    const product = await Product.findById(productId);

    if (!product) {
        throw new Error('Product not found');
    }

    // Check if user is the creator or admin
    if (product.createdBy.toString() !== userId) {
        throw new Error('Not authorized to update this product');
    }

    // Validate data if provided
    if (updateData.name || updateData.description || updateData.price || updateData.category || updateData.images) {
        const validationData = {
            name: updateData.name || product.name,
            description: updateData.description || product.description,
            price: updateData.price || product.price,
            category: updateData.category || product.category,
            images: updateData.images || product.images
        };
        validateProductData(validationData);
    }

    // Check SKU uniqueness if being updated
    if (updateData.sku && updateData.sku !== product.sku) {
        const existingProduct = await Product.findOne({ sku: updateData.sku });
        if (existingProduct) {
            throw new Error('SKU already exists');
        }
    }

    // Update the product
    Object.keys(updateData).forEach(key => {
        if (updateData[key] !== undefined) {
            product[key] = updateData[key];
        }
    });

    await product.save();

    return await Product.findById(productId).populate('createdBy', 'name email');
}

async function deleteProduct(productId, userId) {
    const product = await Product.findById(productId);

    if (!product) {
        throw new Error('Product not found');
    }

    // Check if user is the creator or admin
    if (product.createdBy.toString() !== userId) {
        throw new Error('Not authorized to delete this product');
    }

    // Soft delete by setting isActive to false
    product.isActive = false;
    await product.save();

    return { message: 'Product deleted successfully' };
}

async function hardDeleteProduct(productId, userId) {
    const product = await Product.findById(productId);

    if (!product) {
        throw new Error('Product not found');
    }

    // Check if user is the creator or admin
    if (product.createdBy.toString() !== userId) {
        throw new Error('Not authorized to delete this product');
    }

    await Product.findByIdAndDelete(productId);

    return { message: 'Product permanently deleted' };
}

// Add or update a user's rating for a product
async function rateProduct(productId, userId, ratingValue) {
    if (ratingValue < 1 || ratingValue > 5) throw new Error('Rating must be between 1 and 5');
    const product = await Product.findById(productId);
    if (!product) throw new Error('Product not found');
    // Check if user has already rated
    const existing = product.ratings.find(r => r.user.toString() === userId);
    if (existing) {
        existing.rating = ratingValue;
    } else {
        product.ratings.push({ user: userId, rating: ratingValue });
    }
    await product.save();
    // Populate createdBy for consistency
    const updated = await Product.findById(productId).populate('createdBy', 'name email');
    return updated;
}

async function getReviews(productId) {
    const product = await Product.findById(productId).populate('reviews.user', 'name email');
    if (!product) throw new Error('Product not found');
    return product.reviews;
}

async function addOrUpdateReview(productId, userId, rating, comment) {
    const product = await Product.findById(productId);
    if (!product) throw new Error('Product not found');
    // Check if user already reviewed
    const existing = product.reviews.find(r => r.user.toString() === userId);
    if (existing) {
        existing.rating = rating;
        existing.comment = comment;
        existing.createdAt = new Date();
    } else {
        product.reviews.push({ user: userId, rating, comment });
    }
    await product.save();
    return product.reviews;
}

async function deleteReview(productId, userId, reviewId) {
    const product = await Product.findById(productId);
    if (!product) throw new Error('Product not found');
    const review = product.reviews.id(reviewId);
    if (!review) throw new Error('Review not found');
    // Only author or product creator can delete
    if (review.user.toString() !== userId && product.createdBy.toString() !== userId) {
        throw new Error('Not authorized to delete this review');
    }
    review.remove();
    await product.save();
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    getProductDetails,
    updateProduct,
    deleteProduct,
    hardDeleteProduct,
    rateProduct,
    getReviews,
    addOrUpdateReview,
    deleteReview
}; 