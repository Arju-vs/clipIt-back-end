const User = require('../Modals/user');

// follow || unfollow
const followUser = async (req, res) => {
    console.log("Follow User Function Called!");
    try {
        const userToFollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user.id);

        if (!userToFollow || !currentUser) {
            return res.status(404).json({ message: "User not found" });
        }
        // unfollow
        if (currentUser.followings.includes(userToFollow._id)) {
            await User.findByIdAndUpdate(req.user.id, { $pull: { followings: userToFollow._id } });
            await User.findByIdAndUpdate(req.params.id, { $pull: { followers: req.user.id } });
            return res.status(200).json({ message: "Unfollowed successfully" });
        }   
        // follow 
        else {
            await User.findByIdAndUpdate(req.user.id, { $push: { followings: userToFollow._id } });
            await User.findByIdAndUpdate(req.params.id, { $push: { followers: req.user.id } });
            return res.status(200).json({ message: "Followed successfully" });
        }
    } catch (error) {
        console.error("Error in followUser:", error);
        res.status(500).json({ message: error.message });
    }
};

// checkStatus
const checkFollowStatus = async (req, res) => {
    try {
        const userToCheck = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user.id);

        if (!userToCheck || !currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const isFollowing = currentUser.followings.includes(userToCheck._id);
        res.status(200).json({ isFollowing });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { followUser , checkFollowStatus };
