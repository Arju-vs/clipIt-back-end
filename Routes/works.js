const express = require("express")
const workController = require('../Controllers/work')

const router = express.Router()

router.get('/getworks',workController.getWorks)
router.get('/getwork/:id',workController.getOneWork)

module.exports = router
