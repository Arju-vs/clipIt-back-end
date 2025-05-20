const User = require('../Modals/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Video = require('../Modals/video')

const cookieOptions = {
    httpOnly: true,
    secure:false, 
    sameSite:'Lax'
}

exports.signUp = async(req,res)=>{
    console.log("inSignUPFunction");
    try{
        const { channelName, userName, about, profilePic, password} = req.body
        console.log(channelName, userName, about, profilePic, password);
        const existingUser = await User.findOne({userName})
        if(existingUser){
            res.status(404).json({error:"User Already Exists!!! "})
        }else{
            let updatedPass = await bcrypt.hash(password, 10)
            const user = new User({
                channelName,userName,about,profilePic,password:updatedPass
            })
            await user.save()
            res.status(201).json({message:"User registered successfully", success: "yes",data:user })
        }
        
    }catch(error){
        res.status(401).json({error: "Server Error"})
    }
}

exports.signIn = async(req,res)=>{
    console.log("InsideSignIn");
    try{
        const {userName , password} = req.body
        const user = await User.findOne({userName})
        if(user && await bcrypt.compare(password,user.password)){
            const token = jwt.sign({userId: user._id },process.env.jwtpassword)
            res.cookie('token', token,cookieOptions)
            console.log(token);
            res.json({message : 'Logged in successfully', success:"true",token,user})
        }else{
            res.status(406).json({error: "Invalid E-mail or Password"})
        }
    }catch(err){
        res.status(401).json({error: "Server Error"})
    }
}

exports.logout = async(req,res)=>{
    res.clearCookie('token',cookieOptions).json({message:"Logged Out Successfully"})
}

exports.getUser = async(req,res)=>{
     try {
        const userId = req.params.userId;

        const user = await User.findById(userId).select("-password");
        const video = await Video.find({ user: userId });

        res.json({ user, video });
    } catch (error) {
        res.status(500).json({ error: "Server error while fetching profile" });
    }
}

exports.editUser = async (req, res) => {
    console.log("Inside EditUser");
    const userId = req.userId;
    const { channelName, userName, about, profilePic, password } = req.body;

    try {
        let updatedPass = await bcrypt.hash(password, 10)
        const updateUser = await User.findByIdAndUpdate(
            { _id: userId },
            { 
                $set: { channelName, userName, about, profilePic, password:updatedPass } 
            },
            { new: true }
        );

        if (!updateUser) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("Updated User:", updateUser);
        res.status(200).json(updateUser);
    } catch (err) {
        console.error("Update Error:", err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
};

exports.deleteUser = async (req, res) => {
    console.log("Inside deleteUser");
    try {
        const userId = req.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        // Delete all videos
        const deletedVideos = await Video.deleteMany({ user: userId });
        console.log(`Deleted ${deletedVideos.deletedCount} videos`);

        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: "User and videos deleted successfully!" });

    } catch (error) {
        res.status(500).json({ error: "Failed to delete user" });
    }
};

