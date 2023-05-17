const mongoose = require("mongoose")

const Message = mongoose.Schema({
	senderEmail: {
    type: String,
    required: true,
  },
	email: {
    type: String,
    required: true,
  },
	text: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
})

module.exports = mongoose.model("Message", Message)

