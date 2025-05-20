const jwt = require('jsonwebtoken');
const User = require('../Modals/user');

const auth = async (req, res, next) => {
    try {
        let token = req.cookies.token;
        const authHeader = req.headers["authorization"];

        if (!token && authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({ error: "Unauthorized: No token provided" });
        }

        // Verify token
        const jwtResponse = jwt.verify(token, process.env.jwtpassword);
        req.user = await User.findById(jwtResponse.userId).select('-password');
        req.userId = jwtResponse.userId;
        req.isAdmin = jwtResponse.isAdmin;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
};

module.exports = auth;
