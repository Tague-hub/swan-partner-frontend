const mongoose = require("mongoose")

const studentSchema = mongoose.Schema({
	firstName: {
    type: String,
    required: true,
  },
	lastName: {
    type: String,
  },
	fullName: {
    type: String,
  },
	matricule: {
    type: String,
    unique: true,
  },
	classRoom: {
    type: String,
  },
}, {
  timestamps: true,
})

module.exports = mongoose.model("Student", studentSchema)
