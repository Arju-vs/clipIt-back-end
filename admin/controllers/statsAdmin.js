const User = require("../../Modals/user");
const Video = require("../../Modals/video");
const Comment = require("../../Modals/comment");

exports.getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ isAdmin: false });
        const totalVideos = await Video.countDocuments();
        const totalComments = await Comment.countDocuments();
        
        res.json({
            totalUsers,
            totalVideos,
            totalComments,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


exports.userGraph = async (req, res) => {
    try {
        const usersWithVideos = await User.countDocuments({
          videos: { $exists: true, $not: { $size: 0 } },
        });
    
        const usersWithoutVideos = await User.countDocuments({
          $or: [{ videos: { $exists: false } }, { videos: { $size: 0 } }],
        });
    
        res.json([
          { name: "With Videos", count: usersWithVideos },
          { name: "Without Videos", count: usersWithoutVideos },
        ]);
      } catch (error) {
        res.status(500).json({ message: "Error fetching user video stats", error: error.message });
      }
};

