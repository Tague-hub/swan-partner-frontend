const router = require("express").Router()
const User = require("../models/User")
const TeacherInfo = require("../models/TeacherInfo")
const CryptoJS = require("crypto-js")

// Check if there is super admin yet
router.get("/check-admin", async (req, res) => {
  try {
    const user = await User.find({type: "admin"})
      if(!user) {
        return res.status(401).json({message: "No admin"})
      }
    res.status(200).json({message: "OK"})
  } catch (error) {
    res.status(500).json(error)
  }
})

// Create a super admin if not one exists
router.post("/create/superadmin", async (req, res) => {
  try {
    const users = await User.find()
    if(users.length !== 0) {
      return res.status(401).json({message: "Unhautorized"})
    }
    req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY)
    const {type, ...data} = req.body
   const user = new User({...data, type: "admin"}) 
    await user.save()
    const {password, type:_type, ...info} = user._doc
    res.status(201).json(info)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Create a new user
router.post("/create", async (req, res) => {
  try {
    req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY)
   const user = new User(req.body) 
    await user.save()
    if(user.type === "teacher") {
      const teacherInfo = new TeacherInfo({
        userId: user._id,
        classRooms: [],
      })
      await teacherInfo.save()
    }
    const {password, type, ...info} = user._doc
    res.status(201).json(info)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Update user information
router.put("/update/:userId", async (req, res) => {
  try {
   const user = await User.findByIdAndUpdate(
     req.params.userId,
      req.body,
     {
       new: true
     }) 
    const {password, type, ...info} = user._doc
    res.status(200).json(info)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Delete user
router.delete("/delete/:userId", async (req, res) => {
  try {
   await User.findByIdAndDelete(req.params.userId) 
    res.status(200).json({
      message: "ok"
    })
  } catch (error) {
    res.status(500).json(error)
  }
})

// Get single user
router.get("/find/:userId", async (req, res) => {
  try {
   const user = await User.findById(req.params.userId) 
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Get all users
router.get("/", async(req, res) => {
  try {
    const type = req.query.type
   const users = !type ? await User.find() : await User.find({type}) 
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
