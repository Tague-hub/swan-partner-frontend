const router = require("express").Router()
const User = require("../models/User")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")
const verifyToken = require("../utils/verifyToken")

// Login
router.post("/login", async (req, res) => {
  try {
const user = await User.findOne({email: req.body.email})
    if (!user || !req.body.email || !req.body.password) {
      return res.status(401).json({error: "Wrong credentials"})
    } 
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY)
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password && res.status(401).json({error: "Wrong credentials"})

    const accessToken = jwt.sign({
      id: user._id,
      isAdmin: user.type === "admin",
      type: user?.type ?? '',
      firstName: user?.firstName ?? '',
      email: user?.email ?? '',
    }, process.env.SECRET_KEY, {
      expiresIn: "5d"
    })
    const {password, ...info} = user._doc

    res.status(200).json({...info, accessToken})
  } catch (error) {
    console.log({error})
    res.status(500).json({error})
  }
})

router.get("/me", verifyToken, async (req, res) => {
  try {
    const {password, ...info} = req.user
    res.status(200).json(info)
  } catch (error) {
    console.log({error})
    res.status(500).json({error})
  }
})

module.exports = router
