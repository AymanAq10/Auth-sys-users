// controllers/userController.js
const User = require('../Models/UsersAuth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const nodemailer = require('nodemailer');
const transporter = require('../config/nodemailer');
// ... (previous controller methods)

exports.signUp = async (req, res) => {
  
  const { fullName, email, password,role} = req.body;
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
const lastUser = await User.findOne({}, {}, { sort: { userId: -1 } });
    const userId = lastUser ? lastUser.userId + 1 : 1;
    
    const newUser = new User({userId,fullName, email, password: hashedPassword ,role: role});
    const result = await newUser.save();
    res.status(201).json(result);
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};






exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'User Undefined' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // Generate a JWT token for the user
    if(email!== '' && password !== ''){
    const token = jwt.sign({ userId: user._id,role: user.role }, config.SECRET_KEY, { expiresIn: '30day' });
    const id = user.userId;
    const role = user.role;
    res.status(200).json({ token ,id,role});
    }
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ... (other imports)


// Generate a random 6-character code
function generateRandomCode(length) {
  const characters = '012345678910';
  let code = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return code;
}

exports.sendResetCode = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    console.log(email)
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate a 6-character reset code
    const resetCode = generateRandomCode(6);

    // Update the user's resetCode field in the database
    user.resetCode = resetCode;
    await user.save();

    // Send the reset code to the user's email


    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: `${email}`,
      subject: 'Password Reset Code',
      text: `Your password reset code is: ${resetCode}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Reset code sent successfully' });
    });
  } catch (error) {
    console.error('Error sending reset code:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// ...

// Add a new controller method for resetting the password using the reset code



exports.checkresetCode = async (req, res) => {
  const { email, resetCode } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the provided reset code matches the user's stored resetCode
    if (user.resetCode !== resetCode) {
      return res.status(400).json({ error: 'Invalid reset code' });
    }

    // If the code matches, you can mark it as verified if needed

    res.status(200).json({ message: 'Code verified. You can now reset your password.' });
  } catch (error) {
    console.error('Error verifying reset code:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the reset code matches the user's resetCode
    

    // Reset the user's password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetCode = null; // Clear the reset code
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



