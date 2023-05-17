const router = require("express").Router()
const Material = require("../models/Material")

// Post
router.post("/create", async (req, res) => {
  try {
   const material = new Material(req.body) 
    await material.save()
    res.status(201).json(material._doc)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Update
router.put("/update/:materialId", async (req, res) => {
  try {
   const material = await Material.findByIdAndUpdate(
     req.params.materialId,
      req.body,
     {
       new: true
     })
    res.status(200).json(material._doc)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Delete
router.delete("/delete/:materialId", async (req, res) => {
  try {
   await Material.findByIdAndDelete(req.params.materialId) 
    res.status(200).json({
      message: "ok"
    })
  } catch (error) {
    res.status(500).json(error)
  }
})

// Get
router.get("/find/:materialId", async (req, res) => {
  try {
   const material = await Material.findById(req.params.materialId) 
    res.status(200).json(material)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Get all
router.get("/", async(req, res) => {
  try {
   const materials = await Material.find() 
    res.status(200).json(materials)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
