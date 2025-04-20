
const User = require('../models/users')
const Comment = require('../models/comment');


exports.addComment = async (req, res) => {
    try {
        const { video, message } = req.body;
        console.log("here")
        // console.log(video)
        const comment = new Comment({ user: req.user._id, video, message });
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

// Get comments for a video (public route)
exports.getCommentById = async(req,res)=>{
    try {
        const comments = await Comment.find({ video: req.params.videoId }).populate('user', 'username profilePic userName createdAt');
        res.json(comments);
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
}
