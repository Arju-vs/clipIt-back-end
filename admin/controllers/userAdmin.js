const User = require("../../Modals/user");

//  GetAllUsers
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({ isAdmin: false }).select("-password");
        const formattedUsers = users.map(user => ({
            id : user._id,
            userName : user.userName,
            channelName : user.channelName,
            totalVideos : user.videos.length,
            followersCount : user.followers.length,
            followingsCount : user.followings.length,
        }));

        res.status(200).json(formattedUsers);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

//  DeleteUSer
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting user" });
    }
};


