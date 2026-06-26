const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    role: {
      type: String,
      enum: ['job_seeker', 'employer', 'admin'],
      default: 'job_seeker'
    },
    status: {
      type: String,
      enum: ['active', 'suspended'],
      default: 'active'
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
