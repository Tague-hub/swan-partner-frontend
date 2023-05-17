const router = require("express").Router();
const Invoice = require("../models/Invoice");
const verifyToken = require("../utils/verifyToken");
const mongoose = require("mongoose");
// Post
router.post("/create", verifyToken, async (req, res) => {
  try {
    if (!(req.user.isAdmin || req.user.type === "secretary")) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }
    const student = mongoose.Schema.Types.ObjectId(req.body.student);
    const invoice = new Invoice({
      ...req.body,
      student,
    });
    await invoice.save();
    res.status(201).json(invoice._doc);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update
router.put("/update/:invoiceId", verifyToken, async (req, res) => {
  try {
    if (!(req.user.isAdmin || req.user.type === "secretary")) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }
    const invoice = await Invoice.findByIdAndUpdate(
      req.params.invoiceId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(invoice._doc);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete
router.delete("/delete/:invoiceId", verifyToken, async (req, res) => {
  try {
    if (!(req.user.isAdmin || req.user.type === "secretary")) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }
    await Invoice.findByIdAndDelete(req.params.invoiceId);
    res.status(200).json({
      message: "ok",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get
router.get("/find/:invoiceId", verifyToken, async (req, res) => {
  try {
    if (!(req.user.isAdmin || req.user.type === "secretary")) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }
    const invoice = await Invoice.findById(req.params.invoiceId).populate(
      "student"
    );
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get all
router.get("/", verifyToken, async (req, res) => {
  try {
    if (!(req.user.isAdmin || req.user.type === "secretary")) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }
    const invoices = await Invoice.find().populate("student");
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
