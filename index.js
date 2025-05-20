const express = require('express');
const app = express();
require('dotenv').config();
const PORT = 4000;
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('./Connection/conn');

app.use(cors({
    origin: 'https://clipitgaming-taupe.vercel.app',
    credentials: true
}));
app.use(express.json());
app.use(express.text());
app.use(cookieParser());

const AuthRoutes = require('./Routes/user');
const VideoRoutes = require('./Routes/video');
const CommentRoutes = require('./Routes/comment');
const followRoutes = require('./Routes/follow');
const likeRoutes = require('./Routes/like');
const reactRoutes = require('./Routes/reaction');
const commentFuncRoutes = require('./Routes/commentFunc');
const categoryRoutes = require('./Routes/category');
const contactRoutes = require('./Routes/contact');
const igdbRoutes = require('./Routes/igdb');
const workRoutes = require('./Routes/works')

//  Admin Routes
const adminRoutes = require("./admin/routes/AdminRoutes");

//   Routes
app.use('/auth', AuthRoutes);
app.use('/api', VideoRoutes);
app.use('/commentApi', CommentRoutes);
app.use('/follow', followRoutes);
app.use('/api/video', likeRoutes, reactRoutes);
app.use('/api/comment', commentFuncRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/contact', contactRoutes);
app.use('/igdb', igdbRoutes);
app.use('/work',workRoutes)

//  Admin
app.use("/api/admin", adminRoutes);

app.get('/', (req, res) => {
    res.send({
        message: "STARTED BACKEND"
    });
});

app.listen(PORT, () => {
    console.log(`BACKEND STARTED AT PORT ${PORT}`);
});
