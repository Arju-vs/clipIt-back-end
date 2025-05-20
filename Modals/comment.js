const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'video',
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    replies: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        message: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('comment', commentSchema);
