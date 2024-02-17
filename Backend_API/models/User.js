const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    trim: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/,
  },
  Age: {
    type: Number,
    required: true,
    min: 0,
  },
  Country: {
    type: String,
    required: true,
    trim: true,
  },
  Password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true,
  },
});

const UserSchemas = mongoose.model('User', userSchema);

module.exports = UserSchemas;
