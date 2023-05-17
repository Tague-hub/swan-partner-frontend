const mongoose = require("mongoose")

const activitySchema = mongoose.Schema({
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

module.exports = mongoose.model("Activity", activitySchema)
