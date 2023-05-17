const router = require("express").Router()
const DailyChallenge = require("../models/DailyChallenge")
const verifyToken = require("../utils/verifyToken")

// Post
router.post("/create", verifyToken, async (req, res) => {
  try {
   const dailyChallenge = new DailyChallenge(req.body) 
    await dailyChallenge.save()
    res.status(201).json(dailyChallenge._doc)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Update
router.put("/update/:dailyChallengeId", verifyToken, async (req, res) => {
  try {
   const dailyChallenge = await DailyChallenge.findByIdAndUpdate(
     req.params.dailyChallengeId,
      req.body,
     {
       new: true
     })
    res.status(200).json(dailyChallenge._doc)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Delete
router.delete("/delete/:dailyChallengeId", verifyToken, async (req, res) => {
  try {
   await DailyChallenge.findByIdAndDelete(req.params.dailyChallengeId) 
    res.status(200).json({
      message: "ok"
    })
  } catch (error) {
    res.status(500).json(error)
  }
})

// Get
router.get("/find/:dailyChallengeId", verifyToken, async (req, res) => {
  try {
   const dailyChallenge = await DailyChallenge.findById(req.params.dailyChallengeId) 
    res.status(200).json(dailyChallenge)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Get all
router.get("/", verifyToken, async(req, res) => {
  try {
   const dailyChallenges = req.user.isAdmin
      ? await DailyChallenge.find()
      : await DailyChallenge.find({teacherId: req.user.id})
    res.status(200).json(dailyChallenges)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
