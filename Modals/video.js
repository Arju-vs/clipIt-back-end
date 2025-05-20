const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    videoLink: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    gameName: {
        type: String,
        required: true,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: 0
    }], 
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: 0
    }],
    views: { 
        type: Number, 
        default: 0 
    },
    viewers: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user' 
    }]
}, { timestamps: true });

module.exports = mongoose.model('video', videoSchema);
