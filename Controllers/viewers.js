const Video = require('../Modals/video')

exports.incrementViewCount = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const video = await Video.findById(id);
        if (!video) return res.status(404).json({ message: "Video not found" });

        // Check if the user has already viewed the video
        if (!video.viewers.includes(userId)) {
            video.views += 1;
            video.viewers.push(userId);
            await video.save();
        }
        res.status(200).json({ message: "View count updated", views: video.views });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.getTrendingVideos = async (req, res) => {
    try {
        const trendingVideos = await Video.find().sort({ views: -1 }).limit(5).populate('user', 'channelName profilePic');
        if (!trendingVideos.length) {
            return res.status(404).json({ message: 'No trending videos found' });
        }
        res.status(200).json(trendingVideos);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};