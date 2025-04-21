const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users')
const Video = require('../models/video');

const cookieOptions = {
  httpOnly: true,
  secure: false, // Set to true in production
  sameSite: 'Lax'

};
exports.signUp = async (req, res) => {
  const { channelName, userName, about, profilePic, password } = req.body;
  try {
    const isExist = await User.findOne({ userName });
    if (isExist) {
      res.status(400).json({ error: "Username Already Exist" });
    } else {
      const user = new User({ channelName, userName, about, profilePic, password: await bcrypt.hash(password, 10) });
      await user.save();
      res.status(201).json({ message: 'User registered successfully', success: "yes" });
    }

  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

exports.signIn = async (req, res) => {


  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName });
    if (user && await bcrypt.compare(password, user.password)) {

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      res.cookie('token', token, cookieOptions);
      // console.log(req.cookies)
      res.json({ message: 'Logged in successfully', success: "true", user, token });
    } else {
      res.status(400).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }

}
exports.logout = async (req, res) => {
  res.clearCookie('token', cookieOptions).json({ message: 'Logged out successfully' });
}


// exports.getUserById = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const isUser = await User.findById( userId );
//     if(!isUser){
//       res.status(400).json({ error: "User Doesnot Exist" });
//     }else{

//     }
//   } catch (error) {
//     res.status(500).json({ error: error });
//   }
// }


exports.subscribe = async (req, res) => {
  try {
    let { userId } = req.body;
    let ownId = req.user;
    const channel = await User.findById(userId);
    if (channel) {
      if (!channel.subscriber.includes(ownId._id)) {
        channel.subscriber.push(ownId._id);
        await channel.save();
        res.status(200).json({ message: 'Successfully subscribed' });
      }

    }

  } catch (error) {
    res.status(500).json({ error: error });
  }
}

exports.unsubscribe = async (req, res) => {
  try {
    let { userId } = req.body;
    let ownId = req.user;
    const channel = await User.findById(userId);
    if (channel) {

      if(channel.subscriber.includes(ownId._id)){
        channel.subscriber.pull(ownId._id);
        await channel.save();
        return res.status(200).json({ message: 'Successfully Unsubscribed' });
      }
      return res.status(400).json({message:"Something Went Wrong"})
    }

  } catch (error) {
    res.status(500).json({ error: error });
  }
}

exports.getAllSubcribedChannel = async(req,res)=>{
  try{
    const usersISubscribedTo = await User.find({
      subscriber: { $in: [req.user._id] } // or your userId
    }).select('userName channelName profilePic');
    console.log(usersISubscribedTo)
    res.status(200).json({
      data:usersISubscribedTo
    })
  } catch (error) {
    res.status(500).json({ error: error });
  }
}