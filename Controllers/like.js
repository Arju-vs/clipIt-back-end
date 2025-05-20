const Video = require('../Modals/video');

// Like a video 
const likeVideo = async (req, res) => {
    try {
        const { videoId } = req.params;
        const userId = req.user.id;

        const video = await Video.findById(videoId);
        if (!video) return res.status(404).json({ message: "Video not found" });

        // Remove user from dislikes if they previously disliked
        video.dislikes = video.dislikes.filter(id => id.toString() !== userId);

        // Toggle like
        if (video.likes.includes(userId)) {
            video.likes = video.likes.filter(id => id.toString() !== userId); // Unlike
        } else {
            video.likes.push(userId);
        }

        await video.save();
        res.status(200).json({ 
            message: video.likes.includes(userId) ? "Video liked" : "Like removed", 
            likes: video.likes.length, 
            dislikes: video.dislikes.length 
        });
    } catch (error) {
        res.status(500).json({ message: "Error liking video", error });
    }
};

// Unlike a video (explicit unlike)
const unlikeVideo = async (req, res) => {
    try {
        const { videoId } = req.params;
        const userId = req.user.id;

        const video = await Video.findById(videoId);
        if (!video) return res.status(404).json({ message: "Video not found" });

        // Remove user from likes
        video.likes = video.likes.filter(id => id.toString() !== userId);

        await video.save();
        res.status(200).json({ message: "Video unliked", likes: video.likes.length });
    } catch (error) {
        res.status(500).json({ message: "Error unliking video", error });
    }
};

// Dislike a video (toggle dislike)
const dislikeVideo = async (req, res) => {
    try {
        const { videoId } = req.params;
        const userId = req.user.id;

        const video = await Video.findById(videoId);
        if (!video) return res.status(404).json({ message: "Video not found" });

        // Remove user from likes if they previously liked
        video.likes = video.likes.filter(id => id.toString() !== userId);

        // Toggle dislike
        if (video.dislikes.includes(userId)) {
            video.dislikes = video.dislikes.filter(id => id.toString() !== userId); // Undislike
        } else {
            video.dislikes.push(userId);
        }

        await video.save();
        res.status(200).json({ 
            message: video.dislikes.includes(userId) ? "Video disliked" : "Dislike removed", 
            likes: video.likes.length, 
            dislikes: video.dislikes.length 
        });
    } catch (error) {
        res.status(500).json({ message: "Error disliking video", error });
    }
};

// Undislike a video (explicit undislike)
const undislikeVideo = async (req, res) => {
    try {
        const { videoId } = req.params;
        const userId = req.user.id;

        const video = await Video.findById(videoId);
        if (!video) return res.status(404).json({ message: "Video not found" });

        // Remove user from dislikes
        video.dislikes = video.dislikes.filter(id => id.toString() !== userId);

        await video.save();
        res.status(200).json({ message: "Video undisliked", dislikes: video.dislikes.length });
    } catch (error) {
        res.status(500).json({ message: "Error undisliking video", error });
    }
};

module.exports = { likeVideo, unlikeVideo, dislikeVideo, undislikeVideo };
