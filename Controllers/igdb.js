const axios = require("axios");

const CLIENT_ID = "6tbstlkyj4ukgst7gli7vlv4gzkgcb";
const ACCESS_TOKEN = "wcz59o8w0b45p1hzt60lyvxs1eht6w";

exports.igdbAPI = async (req, res) => {
    try {
        let query = req.body; 
        if (!query || query.trim() === "") {
            return res.status(400).json({ message: "Query is empty" });
        }
        if (!query.trim().endsWith(";")) {
            query = query.trim() + ";";
        }

        const url = "https://api.igdb.com/v4/games/";
        const headers = {
            "Client-ID": CLIENT_ID,
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "text/plain",
        };

        const response = await axios.post(url, query, { headers });

        if (!response.data || response.data.length === 0) {
            return res.status(200).json([]);
        }
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching games from IGDB" });
    }
};
