const router = require("express").Router()
const Course = require("../models/Course")
const TeacherInfo = require("../models/TeacherInfo")
const User = require("../models/User")
const upload = require("../utils/storeFile")
const verifyToken = require("../utils/verifyToken")

// Post
router.post("/create", (req,  res, next) => {
  req.filename = (new Date()).toUTCString() + ".pdf";
  next();
}, verifyToken, upload.single('fileUrl'), async (req, res) => {
  try {
   const course = new Course({
     ...req.body,
     fileUrl: req.file?.path ?? '',
   }) 
    await course.save()
    res.status(201).json(course._doc)
  } catch (error) {
    console.log({error})
    res.status(500).json(error)
  }
})

// Update
router.put("/update/:courseId", verifyToken, upload.single('fileUrl'), async (req, res) => {
  try {
   const course = await Course.findByIdAndUpdate(
     req.params.courseId,
     {
       ...req.body,
       fileUrl: "/uploads/" + (req.file?.filename ?? ''),
     },
     {
       new: true
     })
    res.status(200).json(course._doc)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Delete
router.delete("/delete/:courseId", verifyToken, async (req, res) => {
  try {
   await Course.findByIdAndDelete(req.params.courseId) 
    res.status(200).json({
      message: "ok"
    })
  } catch (error) {
    res.status(500).json(error)
  }
})

// Get
router.get("/find/:courseId", verifyToken, async (req, res) => {
  try {
   const course = await Course.findById(req.params.courseId) 
    res.status(200).json(course)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Get all
router.get("/", verifyToken, async(req, res) => {
  if(req.user.isAdmin) {
  try {
   const courses = await Course.find() 
    res.status(200).json(courses)
  } catch (error) {
    res.status(500).json(error)
  }
  } else {
  try {
    let teacherInfo;
   teacherInfo = await TeacherInfo.findOne({teacherId: req.user.id}) 

    if(!teacherInfo) {
      const teacher = await User.findById(req.user.id)
      if(!teacher) {
       return res.status(403).json({message: "Teacher not exists"}) 
      }
      teacherInfo = new TeacherInfo({
        teacherId: req.user.id,
        courses: [],
        classRooms: [],
      })
      await teacherInfo.save()
    }

      const courses = []
      for(let i= 0; i < teacherInfo.courses?.length; i++) {
        const course = await Course.findById(teacherInfo.courses[i])
        courses.push(course)
      }
      res.status(200).json(courses)
    } catch (error) {
      res.status(500).json(error)
    }
  }
})


// Assign a course
router.post("/assign", verifyToken, async (req, res) => {
  try {
    let teacherInfo;
   const course = await Course.findById(req.body.courseId) 
   teacherInfo = await TeacherInfo.findById(req.body.teacherId) 

    if(!course) {
     return res.status(403).json({message: "Course not exists"}) 
    }

    if(!teacherInfo) {
      const teacher = await User.findById(req.body.teacherId)
      if(!teacher) {
       return res.status(403).json({message: "Teacher not exists"}) 
      }
      teacherInfo = new TeacherInfo({
        teacherId: req.body.teacherId,
        courses: [],
        classRooms: [],
      })
      await teacherInfo.save()
    }

    teacherInfo.courses = [req.body.courseId]
    await teacherInfo.save()

    res.status(200).json({messsage: "ok"})
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
