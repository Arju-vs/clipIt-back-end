const express = require('express')
const Category = require('../Controllers/category')

const router = express.Router()

// get
router.get('/videos', Category.getVideosByCategory)
router.get("/games", Category.getCategories);

module.exports = router;