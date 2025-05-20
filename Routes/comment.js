const express = require('express')
const router = express.Router()
const commentController = require('../Controllers/comment')
const auth = require('../middleware/authentication')

// addComment
router.post('/comment',auth,commentController.addComment)

// getComment
router.get('/comment/:videoId',commentController.getCommentByVideoId)


module.exports = router