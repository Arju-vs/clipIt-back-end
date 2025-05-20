const Video = require('../Modals/video')
const User = require('../Modals/user')

exports.uploadVideo = async (req, res) => {
    console.log("Inside UploadVideo Controller");
    try {
       const {title, description, gameName, videoLink, thumbnail} = req.body
       console.log(title, description, gameName, videoLink, thumbnail);
       console.log(req.user);
       const videoUpload = new Video({
         user: req.user._id, title, description, gameName, videoLink, thumbnail
        })
        await videoUpload.save()
        await User.findByIdAndUpdate(req.user._id, { 
            $push: { videos: videoUpload._id } 
        });
        res.status(201).json({
            success:"true", "videos": videoUpload
        })
    } catch (error) {
        res.status(401).json({ error: "Server Error" });
    }
};

exports.getAllVideos = async (req, res) => {
    try {
        const searchQuery = req.query.search || "";
        const regex = new RegExp(searchQuery, "i");

        const videos = await Video.find({
            title: { $regex: regex },
        }).populate("user", "channelName profilePic userName createdAt");

        res.status(200).json({
            success: "true",
            videos,
        });
    } catch (error) {
        console.error("Error fetching videos:", error);
        res.status(500).json({ error: "Server Error" });
    }
};


exports.getVideoById = async (req,res)=>{
    try{
        let { id } = req.params
        const video = await Video.findById(id).populate('user','channelName profilePic userName createdAt about followers followings views')
        res.status(201).json({
            success:"true", "video": video
        })
    }catch(error){
        res.status(401).json({ error: "Server Error" });
    }
}

exports.getAllVideosByUserId = async (req,res)=>{
    try{
        let {userId} = req.params
        const video = await Video.find({user:userId}).populate('user','channelName profilePic userName createdAt about followers followings')
        res.status(201).json({
            success:"true", "video": video
        })
    }catch(error){
        res.status(401).json({ error: "Server Error" });
    }
}

exports.deleteVideo = async (req, res) => {
    try {
        const videoId = req.params.id;
        const userId = req.user.id;

        const video = await Video.findById(videoId);

        if(video){
        await Video.findByIdAndDelete(videoId);

        // Remove the video ID from the user's list
        await User.findByIdAndUpdate(userId, { $pull: { videos: videoId } });
        return res.status(200).json({ message: "Video deleted successfully" });
        }else{
            return res.status(404).json({ error: "Video not found" });
        }
    } catch (error) {
        console.error("Error deleting video:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
