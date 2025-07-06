module.exports = function authorize(...roles) {
    return (req, res, next) => {
        // Allow /users/me for any authenticated user
        if (req.originalUrl.endsWith('/users/me')) {
            return next();
        }
        if (!roles.length || roles.includes(req.user.role)) {
            return next();
        }
        return res.status(403).json({ success: false, message: 'Forbidden: insufficient role' });
    };
}; 