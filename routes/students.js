const router = require("express").Router()
const Student = require("../models/Student")
const verifyToken = require("../utils/verifyToken")

// Post
router.post("/create", verifyToken, async (req, res) => {
  if(!["admin", "secretary"].includes(req.user.role)) {
    return res.status(403).json({message: "Cannot process your request"})
  }
  try {
   const student = new Student(req.body) 
    await student.save()
    res.status(201).json(student._doc)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Update
router.put("/update/:studentId", async (req, res) => {
  try {
   const student = await Student.findByIdAndUpdate(
     req.params.studentId,
      req.body,
     {
       new: true
     })
    res.status(200).json(student._doc)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Delete
router.delete("/delete/:studentId", async (req, res) => {
  try {
   await Student.findByIdAndDelete(req.params.studentId) 
    res.status(200).json({
      message: "ok"
    })
  } catch (error) {
    res.status(500).json(error)
  }
})

// Get
router.get("/find/:studentId", async (req, res) => {
  try {
   const student = await Student.findById(req.params.studentId) 
    res.status(200).json(student)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Get all
router.get("/", async(req, res) => {
  try {
   const students = await Student.find() 
    res.status(200).json(students)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
