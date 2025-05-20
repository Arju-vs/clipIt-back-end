const Reaction =  require('../Modals/reaction');
const mongoose = require('mongoose')

// Add a reaction
exports.addReaction = async (req, res) => {
  try { 
    const videoId = req.params.videoId;
    const userId = req.user.id;
    const { type } = req.body;
    const existingReaction = await Reaction.findOne({ videoId, userId });
    if (existingReaction) {
      existingReaction.type = type;
      await existingReaction.save();
      return res.status(200).json(existingReaction);
    }

    const newReaction = new Reaction({ videoId, userId, type });
    await newReaction.save();
    res.status(201).json(newReaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get reactions for a video
exports.getReactions = async (req, res) => {
  try {
    const { videoId } = req.params;
    const reactions = await Reaction.find({ videoId });
    res.status(200).json(reactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove reaction
exports.removeReaction = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.user.id;

    await Reaction.findOneAndDelete({ videoId, userId });
    res.status(200).json({ message: "Reaction removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getReactionCounts = async (req, res) => {
  try {
      const { videoId } = req.params;

      // Aggregate reaction counts by type
      const reactions = await Reaction.aggregate([
          { $match: { videoId: new mongoose.Types.ObjectId(videoId) } },
          { $group: { _id: "$type", count: { $sum: 1 } } }
      ]);

      // Convert array to object format { "😀": 5, "😍": 3, ... }
      const reactionCounts = reactions.reduce((acc, r) => {
          acc[r._id] = r.count;
          return acc;
      }, {});

      res.status(200).json({ reactions: reactionCounts });
  } catch (err) {
      console.error("🔥 Error fetching reactions:", err);
      res.status(500).json({ error: "Failed to fetch reactions" });
  }
};

// Get the user's reaction for a specific video
exports.getUserReaction = async (req, res) => {
  try {
      const { videoId } = req.params;
      const userId = req.user.id;

      const userReaction = await Reaction.findOne({ videoId, userId });

      res.status(200).json({ reaction: userReaction ? userReaction.type : null });
  } catch (err) {
      res.status(500).json({ error: "Failed to fetch user's reaction" });
  }
};
