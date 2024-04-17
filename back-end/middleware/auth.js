// middleware/authentication.js
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../Models/UsersAuth'); // Assuming you have a User model

exports.authenticateUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const decodedToken = jwt.verify(token, config.SECRET_KEY);
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Set req.user with the user's information
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};

