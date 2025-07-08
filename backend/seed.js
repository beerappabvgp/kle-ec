const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');
const productsData = require('./sample-data/products.json');

// Load environment variables
dotenv.config();

// Connect to database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected for seeding');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

// Create a default user for seeding
const createDefaultUser = async () => {
    try {
        // Check if default user exists
        let defaultUser = await User.findOne({ email: 'admin@example.com' });

        if (!defaultUser) {
            defaultUser = await User.create({
                name: 'Admin User',
                email: 'admin@example.com',
                password: 'admin123',
                role: 'admin'
            });
            console.log('Default user created:', defaultUser.email);
        } else {
            console.log('Default user already exists:', defaultUser.email);
        }

        return defaultUser;
    } catch (error) {
        console.error('Error creating default user:', error);
        throw error;
    }
};

// Seed products
const seedProducts = async (defaultUser) => {
    try {
        // Clear existing products
        await Product.deleteMany({});
        console.log('Cleared existing products');

        // Add default user ID to all products
        const productsWithUser = productsData.map(product => ({
            ...product,
            createdBy: defaultUser._id
        }));

        // Insert products
        const products = await Product.insertMany(productsWithUser);
        console.log(`Seeded ${products.length} products`);

        // Log product details with ratings
        products.forEach(product => {
            console.log(`${product.name}: ${product.averageRating} stars (${product.ratingsCount} ratings)`);
        });

        return products;
    } catch (error) {
        console.error('Error seeding products:', error);
        throw error;
    }
};

// Main seeding function
const seedDatabase = async () => {
    try {
        await connectDB();

        console.log('Starting database seeding...');

        // Create default user
        const defaultUser = await createDefaultUser();

        // Seed products
        await seedProducts(defaultUser);

        console.log('Database seeding completed successfully!');

        // Close connection
        await mongoose.connection.close();
        console.log('Database connection closed');

        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

// Run seeding if this file is executed directly
if (require.main === module) {
    seedDatabase();
}

module.exports = seedDatabase; 