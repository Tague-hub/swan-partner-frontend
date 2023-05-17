const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
firstName: {
  type: String,
  required: true,
},
	lastName: {
    type: String
  },
	fullName: {
    type: String,
  },
	email: {
    type: String,
    required: true,
    unique: true,
  },
	password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: "",
  },
	phoneNumber: {
    type: String,
  },
	isOnline: {
    type: Boolean,
    default: false,
  },
	type: {
    type: String,
    enum: ["admin", "secretary", "teacher"]
  },
}, {
  timestamps: true,
})

module.exports = mongoose.model("User", UserSchema)
