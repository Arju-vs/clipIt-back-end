const Video = require('../Modals/video')

exports.getCategories = async (req, res) => {
    try {
        const categories = await Video.distinct("gameName");
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Error fetching categories", error });
    }
};

exports.getVideosByCategory = async (req, res) => {
    try {
        const { gameName } = req.query;

        const query = gameName ? { gameName: { $regex: new RegExp(gameName, "i") } } : {};
        const videos = await Video.find(query);

        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ message: "Error fetching videos", error });
    }
};
