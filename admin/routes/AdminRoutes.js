const express = require("express");
const adminAuth = require("../middleware/AdminMW");
const TestAdmin = require('../controllers/testAdmin')
const UserAdmin = require('../controllers/userAdmin')
const StatsAdmin = require('../controllers/statsAdmin')
const LatestAdmin = require('../controllers/latestAdmin')
const VideoAdmin = require('../controllers/videoAdmin')
const CommentsAdmin = require('../controllers/commentsAdmin')
const ContactsAdmin = require('../controllers/contactsAdmin')
const workAdmin = require('../controllers/workAdmin')

const router = express.Router();

// testAdminworks
router.get("/test-admin", adminAuth, TestAdmin.testAdmin);

// adminLogin
router.post("/login", TestAdmin.adminLogin)

// stats
router.get('/stats', StatsAdmin.getDashboardStats)

// userGraph
router.get('/user-video-stats', StatsAdmin.userGraph)

// latestUsers
router.get('/latest-users', LatestAdmin.latestUsers)


// latestVideos
router.get('/latest-videos', LatestAdmin.latestVideos)


// getUsers
router.get("/get-users", adminAuth,UserAdmin.getUsers)

// deleteUser
router.delete('/delete/:id', adminAuth,UserAdmin.deleteUser)


// Get all videos
router.get("/get-videos", adminAuth, VideoAdmin.getAllVideos);

// Delete a video
router.delete("/videos/:id", adminAuth, VideoAdmin.deleteVideo);

// viewerDetails
router.get("/video/:videoId/viewers", adminAuth, VideoAdmin.getVideoViewers);

// getAllComments
router.get("/get-videos-comments", adminAuth, CommentsAdmin.getAllComments)

// getVideoComments
router.get("/video/:videoId/comments", adminAuth, CommentsAdmin.getVideoComment)

// deleteVideoComments
router.delete("/comment/:commentId", adminAuth, CommentsAdmin.deleteVideoComment)

// deleteVideoComments
router.delete("/comment/:commentId/reply/:replyId", adminAuth, CommentsAdmin.deleteCommentsReply)

// addContacts
router.post('/message', ContactsAdmin.submitContactForm)

// getContacts
router.get("/contacts",adminAuth, ContactsAdmin.getContacts)

// getContacts
router.post("/reply",adminAuth, ContactsAdmin.sendReply)

// addWorks
router.post('/addwork',adminAuth, workAdmin.addWorks)

// getWorks
router.get('/getwork',adminAuth, workAdmin.getWorks)

// updateWorks
router.put('/updatework/:id',adminAuth,workAdmin.updateWorks)

// deleteWork
router.delete('/deletework/:id',adminAuth,workAdmin.deleteWork)

module.exports = router;