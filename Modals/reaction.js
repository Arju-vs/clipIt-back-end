const mongoose = require('mongoose')

const reactionSchema = new mongoose.Schema(
  {
    videoId: { type: mongoose.Schema.Types.ObjectId, ref: "Video", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ['❤️', '😂', ,'😢','💯', '🔥', '😡'], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reaction", reactionSchema);
