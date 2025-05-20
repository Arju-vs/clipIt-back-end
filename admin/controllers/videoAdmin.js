const User = require("../../Modals/user")
const Video = require("../../Modals/video")

// Get all videos with user details
exports.getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find().populate("user", "userName");
        const formattedVideos = videos.map(video => ({
            _id: video._id,
            title: video.title,
            gameName: video.gameName,
            thumbnail: video.thumbnail,
            likes: video.likes.length,
            dislikes: video.dislikes.length,
            views: video.views,
            viewers: video.viewers,
            userName: video.user.userName,
        }));

        res.status(200).json(formattedVideos);
    } catch (error) {
        res.status(500).json({ message: "Error fetching videos" });
    }
};

// Delete a video
exports.deleteVideo = async (req, res) => {
    try {
        const { id } = req.params;

        const video = await Video.findById(id);
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        await User.findByIdAndUpdate(video.userId, { $pull: { videos: id } });

        await Video.findByIdAndDelete(id);
        res.status(200).json({ message: "Video deleted successfully" });
    } catch (error) {
        console.error("Error deleting video:", error);
        res.status(500).json({ message: "Error deleting video" });
    }
};

// Get video viewers
exports.getVideoViewers = async (req, res) => {
    try {
        const { videoId } = req.params;

        const video = await Video.findById(videoId).populate("viewers", "userName");

        res.status(200).json({
            title: video.title,
            viewers: video.viewers.map(viewer => ({
                _id: viewer._id,
                userName: viewer.userName,
            })),
        });
    } catch (error) {
        console.error("Error fetching video viewers:", error);
        res.status(500).json({ message: "Error fetching video viewers" });
    }
};
