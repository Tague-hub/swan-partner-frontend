const router = require("express").Router()
const Message = require("../models/Message")
const verifyToken = require('../utils/verifyToken')

// Post
router.post("/create", verifyToken, async (req, res) => {
  try {
   const message = new Message(req.body) 
    await message.save()
    res.status(201).json(message._doc)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Update
router.put("/update/:messageId", verifyToken, async (req, res) => {
  try {
   const message = await Message.findByIdAndUpdate(
     req.params.messageId,
      req.body,
     {
       new: true
     })
    res.status(200).json(message._doc)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Delete
router.delete("/delete/:messageId", verifyToken, async (req, res) => {
  try {
   await Message.findByIdAndDelete(req.params.messageId) 
    res.status(200).json({
      message: "ok"
    })
  } catch (error) {
    res.status(500).json(error)
  }
})

// Get
router.get("/find/:messageId", verifyToken, async (req, res) => {
  try {
   const message = await Message.findById(req.params.messageId) 
    res.status(200).json(message)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Get all
router.get("/", verifyToken, async(req, res) => {
  try {
   const messages = await Message.find({email: req.user.email}) 
    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
