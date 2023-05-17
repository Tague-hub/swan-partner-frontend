const router = require("express").Router()
const Notification = require("../models/Notification")

// Post
router.post("/create", async (req, res) => {
  try {
   const notification = new Notification(req.body) 
    await notification.save()
    res.status(201).json(notification._doc)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Update
router.put("/update/:notificationId", async (req, res) => {
  try {
   const notification = await Notification.findByIdAndUpdate(
     req.params.notificationId,
      req.body,
     {
       new: true
     })
    res.status(200).json(notification._doc)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Delete
router.delete("/delete/:notificationId", async (req, res) => {
  try {
   await Notification.findByIdAndDelete(req.params.notificationId) 
    res.status(200).json({
      message: "ok"
    })
  } catch (error) {
    res.status(500).json(error)
  }
})

// Get
router.get("/find/:notificationId", async (req, res) => {
  try {
   const notification = await Notification.findById(req.params.notificationId) 
    res.status(200).json(notification)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Get all
router.get("/", async(req, res) => {
  try {
   const notifications = await Notification.find() 
    res.status(200).json(notifications)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
