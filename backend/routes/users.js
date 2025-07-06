const express = require('express');
const {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    hardDeleteUser,
    updateProfilePhoto
} = require('../controllers/userController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

// All routes are protected and require admin role
router.use(auth);

// /me endpoint for current user profile (auth only)
router.get('/me', auth, (req, res) => {
    res.json({ data: req.user });
});

// Profile photo update (authenticated user only) - must be before /:id
router.put('/profile-photo', auth, updateProfilePhoto);

// User management routes
router.route('/')
    .get(getAllUsers)
    .post(createUser);

router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router; 