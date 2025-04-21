
const Videos = require("../models/video");
const Users = require('../models/users')
const Comments = require('../models/comment')




exports.uploadVideo = async (req, res) => {
    try {
        console.log(req.user)
        const { title, description, videoLink, videoType,thumbnail } = req.body;
       
        const video = new Videos({ user: req.user._id, title, description, videoLink, videoType,thumbnail });

        await video.save();
        res.status(201).json({ sucess: "true", video });
    } catch (error) {
        res.status(500).json({ error: 'Server error',error });
    }

}
exports.getAllVideo = async (req, res) => {
    try {
        const videos = await Videos.find().populate('user', 'channelName profilePic userName createdAt');


        res.status(201).json({ sucess: "true", "videos": videos });
    } catch {
        res.status(500).json({ error: 'Server error' });
    }
}

exports.getVideoById = async (req, res) => {
    try {
        const video = await Videos.findById(req.params.id).populate('user', 'userName profilePic userName createdAt subscriber');
        res.status(201).json({ sucess: "true", "video": video });
    } catch {
        res.status(500).json({ error: 'Server error' });
    }
}

exports.getAllVideoByUserID = async(req,res)=>{
    // .populate('user', 'userName profilePic userName createdAt');
    try {
        const video = await Videos.find({user:req.params.userId}).populate('user', 'userName profilePic userName channelName about');
        res.status(201).json({ sucess: "true", "video": video });
    } catch {
        res.status(500).json({ error: 'Server error' });
    }
}
exports.likeVideo = async (req, res) => {
    try {
        const video = await Videos.findByIdAndUpdate(req.params.id,
            { $inc: { like: 1 } },
            { new: true });
        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }
        res.json(video);

    } catch {
        res.status(500).json({ error: 'Server error' });
    }
}
