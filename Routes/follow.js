const express = require('express');
const router = express.Router();
const { followUser ,checkFollowStatus } = require('../Controllers/follow');``
const verifyToken = require('../middleware/authentication'); 

// follow
router.put('/:id', verifyToken, followUser);
// status
router.get('/status/:id', verifyToken, checkFollowStatus);

module.exports = router;
