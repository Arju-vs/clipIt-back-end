const express = require('express')
const commentFunc = require('../Controllers/commentFunc')
const auth = require('../middleware/authentication')

const router = express.Router();

// likeComment
router.post('/like/:commentId' , auth , commentFunc.likeComment)

// replyComment
router.post('/reply/:commentId' , auth , commentFunc.replyToComment)

module.exports = router