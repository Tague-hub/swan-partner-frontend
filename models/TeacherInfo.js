const mongoose = require("mongoose")

const teacherInfoSchema = mongoose.Schema({
  teacherId: {
    type: String,
  },
classrooms: {
  type: Array,
},
  courses: {
    type: Array
  }
}, {
  timestamps: true
})

module.exports = mongoose.model("TeacherInfo", teacherInfoSchema)
