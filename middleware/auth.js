const jwt = require('jsonwebtoken');
const User = require('../models/users');

const auth = async (req, res, next) => {
    const token = req.cookies.token;
    // console.log(token)

    if (!token) {
      return res.status(401).json({ error: 'No token, authorization denied' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password');
      
      next();
    } catch (error) {
      res.status(401).json({ error: 'Token is not valid' });
    }
};

module.exports = auth;