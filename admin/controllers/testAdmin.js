const jwt = require("jsonwebtoken");
const User = require("../../Modals/user");
const bcrypt = require("bcrypt");


exports.testAdmin = (req, res) => {
    res.json({ message: "Admin route is working!", user: req.user });
}

exports.adminLogin = async (req, res) => {
    const { userName, password } = req.body;

    try {
        const user = await User.findOne({ userName, isAdmin: true });
        if (!user) return res.status(403).json({ message: "Admin not found!" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Incorrect password!" });

        // Generate token
        const token = jwt.sign(
            { id: user._id, isAdmin: true },
            process.env.jwtpassword
        );
        res.json({ user, token });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
