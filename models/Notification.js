const mongoose = require("mongoose")

const notificationSchema = mongoose.Schema({
	text: {
    type: String,
    required: true,
  },
	userId: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
})

module.exports = mongoose.model("Notification", notificationSchema)

