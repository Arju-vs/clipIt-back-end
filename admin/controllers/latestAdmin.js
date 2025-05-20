const User = require('../../Modals/user')
const Video = require('../../Modals/video')

exports.latestUsers = async (req,res)=>{
    try {
        const users = await User.find({isAdmin: { $ne: true}}).sort({ createdAt: -1 }).limit(5).select("-password");
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
}

exports.latestVideos = async (req,res)=>{
    try {
        const videos = await Video.find().sort({ createdAt: -1 }).limit(5).populate("user", "channelName userName");
        res.json(videos);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
}
