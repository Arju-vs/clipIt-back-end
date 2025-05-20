const Comment = require('../Modals/comment')

// likeComment
exports.likeComment = async (req, res) => {
    try {
      const { commentId } = req.params;
      const userId = req.user._id;
  
      const comment = await Comment.findById(commentId);
      if (!comment) return res.status(404).json({ error: 'Comment not found' });
  
      const likeIndex = comment.likes.indexOf(userId);
  
      if (likeIndex === -1) {
        comment.likes.push(userId); // Like the comment
      } else {
        comment.likes.splice(likeIndex, 1); // Unlike the comment
      }
  
      await comment.save();
  
      res.status(200).json({
        success: true,
        likesCount: comment.likes.length,
        likedByUser: likeIndex === -1, // True if user just liked it, False if unliked
      });
    } catch (error) {
      console.error('Error liking comment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // replyToComment
  exports.replyToComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { message } = req.body;
        const userId = req.user._id;

        const comment = await Comment.findById(commentId);
        const reply = { user: userId, message, createdAt: new Date() };
        comment.replies.push(reply);
        await comment.save()
        await comment.populate("replies.user", "channelName profilePic _id");
        res.status(201).json({
            success: true,
            reply: comment.replies[comment.replies.length - 1],
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

  