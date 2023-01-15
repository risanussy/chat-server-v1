const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatPost = new Schema({
  nama: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('chatRoom', chatPost);