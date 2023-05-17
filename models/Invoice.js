const mongoose = require("mongoose")

const invoiceSchema = mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  paymentDate: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  }
}, {
  timestamps: true
})

module.exports = mongoose.model("Invoice", invoiceSchema)

