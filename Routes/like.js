const express = require('express')
const { likeVideo , dislikeVideo, unlikeVideo , undislikeVideo } = require('../Controllers/like')
const auth  = require('../middleware/authentication')

const router = express.Router();

router.put("/like/:videoId", auth, likeVideo);
router.put("/dislike/:videoId", auth, dislikeVideo);
router.put("/unlike/:videoId", auth, unlikeVideo);
router.put("/undislike/:videoId", auth, undislikeVideo);

module.exports = router;