const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    trim: true,
    match: /^[0-9]{10}$/,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,  
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
  },
  address: {
    type: String,
    trim: true,
  },
  organization: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,  
  },
  updatedAt: {  type: Date,  default: Date.now,}
}, {
  timestamps: true
});


const User = mongoose.model('Customer', customerSchema);

module.exports = User;
