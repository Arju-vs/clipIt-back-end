const Comment = require("../../Modals/comment")
const Video = require("../../Modals/video")

exports.getAllComments = async (req, res)=>{
    try {
        const videos = await Video.find();

        // Fetch comment counts for each video
        const videoData = await Promise.all(
            videos.map(async (video) => {
                const commentCount = await Comment.countDocuments({ video: video._id });
                return {
                    _id: video._id,
                    title: video.title,
                    commentCount,
                };
            })
        );

        res.json(videoData);
    } catch (error) {
        res.status(500).json({ message: "Error fetching videos with comments" });
    }
}

exports.getVideoComment = async (req, res)=>{
    try {
        const comments = await Comment.find({ video: req.params.videoId })
            .populate("user", "userName")
            .sort({ createdAt: -1 });

        res.json({ comments });
    } catch (error) {
        res.status(500).json({ message: "Error fetching comments" });
    }
}

exports.deleteVideoComment = async (req,res)=>{
    try {
        const { commentId } = req.params;

        const deletedComment = await Comment.findByIdAndDelete(commentId);

        if (!deletedComment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting comment" });
    }
}

exports.deleteCommentsReply = async (req, res)=>{
    try {
        const { commentId, replyId } = req.params;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Filter out the deleted reply
        comment.replies = comment.replies.filter(reply => reply._id.toString() !== replyId);
        await comment.save();

        res.json({ message: "Reply deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting reply" });
    }
}
