const express = require('express')
const { addReaction, removeReaction, getReactions, getReactionCounts, getUserReaction } = require('../Controllers/reaction')
const auth  = require('../middleware/authentication')

const router = express.Router()

router.post("/react/add/:videoId", auth , addReaction)
router.delete("/react/delete/:videoId", auth , removeReaction)
router.get("/react/get/:videoId", auth , getReactions)
router.get("/react/getCounts/:videoId" , getReactionCounts)
router.get("/react/user/:videoId", auth , getUserReaction)
module.exports = router;