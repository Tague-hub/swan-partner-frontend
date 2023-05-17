const mongoose = require("mongoose")

const Material = mongoose.Schema({
	name: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
})

module.exports = mongoose.model("Material", Material)

