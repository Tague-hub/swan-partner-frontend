const router = require("express").Router()
const Activity = require("../models/Activity")

// Post
router.post("/create", async (req, res) => {
  try {
   const activity = new Activity(req.body)
    await activity.save()
    res.status(201).json(activity._doc)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Update
router.put("/update/:activityId", async (req, res) => {
  try {
   const activity = await Activity.findByIdAndUpdate(
     req.params.activityId,
      req.body,
     {
       new: true
     })
    res.status(200).json(activity._doc)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Delete
router.delete("/delete/:activityId", async (req, res) => {
  try {
   await Activity.findByIdAndDelete(req.params.activityId) 
    res.status(200).json({
      message: "ok"
    })
  } catch (error) {
    res.status(500).json(error)
  }
})

// Get
router.get("/find/:activityId", async (req, res) => {
  try {
   const activity = await Activity.findById(req.params.activityId) 
    res.status(200).json(activity)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Get all
router.get("/", async(req, res) => {
  try {
   const activitys = await Activity.find() 
    res.status(200).json(activitys)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
