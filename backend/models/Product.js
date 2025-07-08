const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        maxlength: 1000
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    originalPrice: {
        type: Number,
        min: 0
    },
    discountPercentage: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    brand: {
        type: String,
        trim: true
    },
    images: [{
        type: String,
        required: true
    }],
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    sku: {
        type: String,
        unique: true,
        trim: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    specifications: {
        type: Map,
        of: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    ratings: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            rating: {
                type: Number,
                min: 1,
                max: 5,
                required: true
            }
        }
    ],
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            rating: {
                type: Number,
                min: 1,
                max: 5,
                required: true
            },
            comment: {
                type: String,
                trim: true,
                maxlength: 1000
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
ProductSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Virtual for average rating (from both ratings and reviews)
ProductSchema.virtual('averageRating').get(function () {
    const allRatings = [];

    // Add ratings from the ratings array
    if (this.ratings && this.ratings.length > 0) {
        allRatings.push(...this.ratings.map(r => r.rating));
    }

    // Add ratings from the reviews array
    if (this.reviews && this.reviews.length > 0) {
        allRatings.push(...this.reviews.map(r => r.rating));
    }

    if (allRatings.length === 0) return 0;
    const sum = allRatings.reduce((acc, rating) => acc + rating, 0);
    return Math.round((sum / allRatings.length) * 10) / 10;
});

// Virtual for ratings count (from both ratings and reviews)
ProductSchema.virtual('ratingsCount').get(function () {
    const ratingsCount = this.ratings ? this.ratings.length : 0;
    const reviewsCount = this.reviews ? this.reviews.length : 0;
    return ratingsCount + reviewsCount;
});

// Ensure virtuals are included in toObject and toJSON
ProductSchema.set('toObject', { virtuals: true });
ProductSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Product', ProductSchema); 