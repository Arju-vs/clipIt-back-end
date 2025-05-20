const express = require('express');
const router = express.Router();
const videoController = require('../Controllers/video');
const viewController = require('../Controllers/viewers')
const auth = require('../middleware/authentication')

// userVideos
router.post('/video',auth,videoController.uploadVideo);

// allVideos
router.get('/allVideos',videoController.getAllVideos)

// VideosById
router.get('/getVideoById/:id',videoController.getVideoById)

// AllVideosById
router.get('/:userId/channel',videoController.getAllVideosByUserId)

// views
router.post('/view/:id', auth ,viewController.incrementViewCount)

// deleteVideo
router.delete('/delete/:id',auth , videoController.deleteVideo)

// trendings
router.get('/trending',viewController.getTrendingVideos)


module.exports = router;
