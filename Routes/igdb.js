const express = require("express");
const IGDBGames = require("../Controllers/igdb")

const router = express.Router();

router.post("/games",IGDBGames.igdbAPI)

module.exports = router;

