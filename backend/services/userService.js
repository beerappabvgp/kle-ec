const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function validateEmail(email) {
    return /^\S+@\S+\.\S+$/.test(email);
}

function validatePassword(password) {
    return typeof password === 'string' && password.length >= 6;
}

async function hashPassword(password) {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
    return await bcrypt.hash(password, saltRounds);
}

function generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '30d',
    });
}

async function createUser({ name, email, password, role }) {
    if (!name || !email || !password) throw new Error('Name, email, and password are required');
    if (!validateEmail(email)) throw new Error('Invalid email');
    if (!validatePassword(password)) throw new Error('Password must be at least 6 characters');

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('User already exists with this email');

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role || 'user',
    });

    const token = generateToken(user._id);
    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            isActive: user.isActive,
            createdAt: user.createdAt,
        },
        token,
    };
}

async function loginUser({ email, password }) {
    if (!email || !password) throw new Error('Email and password are required');
    const user = await User.findOne({ email }).select('+password');
    if (!user) throw new Error('Invalid credentials');
    if (!user.isActive) throw new Error('Account is deactivated');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');
    const token = generateToken(user._id);
    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            isActive: user.isActive,
            createdAt: user.createdAt,
        },
        token,
    };
}

async function getUserById(userId) {
    const user = await User.findById(userId).select('-password');
    if (!user) throw new Error('User not found');
    return user;
}

async function getAllUsers(query = {}) {
    const { page = 1, limit = 10, search, role, isActive } = query;
    const filter = {};
    if (search) {
        filter.$or = [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
        ];
    }
    if (role) filter.role = role;
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const users = await User.find(filter)
        .select('-password')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));
    const total = await User.countDocuments(filter);
    return {
        users,
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            pages: Math.ceil(total / parseInt(limit)),
        },
    };
}

async function updateUser(userId, { name, email, role, isActive }) {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    if (email && email !== user.email) {
        if (!validateEmail(email)) throw new Error('Invalid email');
        const existingUser = await User.findOne({ email });
        if (existingUser) throw new Error('Email is already taken');
    }
    user.name = name !== undefined ? name : user.name;
    user.email = email !== undefined ? email : user.email;
    user.role = role !== undefined ? role : user.role;
    user.isActive = isActive !== undefined ? isActive : user.isActive;
    await user.save();
    return await User.findById(userId).select('-password');
}

async function changePassword(userId, { currentPassword, newPassword }) {
    if (!validatePassword(newPassword)) throw new Error('New password must be at least 6 characters');
    const user = await User.findById(userId).select('+password');
    if (!user) throw new Error('User not found');
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) throw new Error('Current password is incorrect');
    user.password = await hashPassword(newPassword);
    await user.save();
    return { message: 'Password updated successfully' };
}

async function deleteUser(userId) {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    user.isActive = false;
    await user.save();
    return { message: 'User deleted successfully' };
}

async function hardDeleteUser(userId) {
    const user = await User.findByIdAndDelete(userId);
    if (!user) throw new Error('User not found');
    return { message: 'User permanently deleted' };
}

async function logoutUser(userId) {
    // For JWT-based auth, we could implement token blacklisting here
    // For now, we'll just return a success message
    // In a production environment, you might want to:
    // 1. Add the token to a blacklist in Redis/database
    // 2. Track logout events for audit purposes
    // 3. Implement token refresh mechanisms

    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    return { message: 'Logged out successfully' };
}

// Update user's profile photo URL
async function updateProfilePhoto(userId, photoURL) {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    user.profilePhoto = photoURL;
    await user.save();
    return await User.findById(userId).select('-password');
}

module.exports = {
    createUser,
    loginUser,
    getUserById,
    getAllUsers,
    updateUser,
    changePassword,
    deleteUser,
    hardDeleteUser,
    logoutUser,
    updateProfilePhoto,
}; 