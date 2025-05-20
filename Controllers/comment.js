const Comment = require('../Modals/comment')


exports.addComment = async (req, res) => {
    try {
        const { video, message } = req.body;
        const comment = new Comment({
            user: req.user._id,
            video,
            message
        });
        await comment.save();
        const populatedComment = await Comment.findById(comment._id).populate('user', 'channelName profilePic userName');
        res.status(206).json({
            success: true,
            comment: populatedComment
        });
    } catch (error) {
        res.status(506).json({ error: "Server Error" });
    }
};



exports.getCommentByVideoId = async (req,res)=>{
    try{
        const {videoId} = req.params
        const comments = await Comment.find({ video: videoId }).populate('user','channelName profilePic userName createdAt')
        .populate("replies.user", "channelName profilePic _id");

        res.status(201).json({
            success:"true", comments
        })
    }catch(error) {
        res.status(401).json({ error: "Server Error" });
    }
}

