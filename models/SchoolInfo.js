const mongoose = require("mongoose")

const SchoolInfoSchema = mongoose.Schema({
	name: {
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

module.exports = mongoose.model("SchoolInfo", SchoolInfoSchema)
