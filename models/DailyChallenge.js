const mongoose = require("mongoose")

const DailyChallenge = mongoose.Schema({
	teacherId: {
    type: String,
    required: true,
  },
	info: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
})

module.exports = mongoose.model("DailyChallenge", DailyChallenge)

