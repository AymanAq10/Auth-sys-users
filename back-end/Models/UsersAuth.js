const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: {
    type: Number,
    unique: true, // Ensure userId is unique
    required: true,
  },
  fullName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user', // Set the default role to 'user'
  },
  resetCode: {
    type: String,
    default: null,
  },
}, {
  versionKey: false,
});

const UsersAuth = mongoose.model("UsersAuth", UserSchema, "users");
module.exports = UsersAuth;

