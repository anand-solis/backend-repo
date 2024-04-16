const mongoose = require("mongoose");

const indentSchema = mongoose.Schema({
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: [true, "organization required."],
  },
  site: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Site",
    required: [true, "organization required."],
  },
  materialId: [
    {
      material: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Material",
        required: [true, "Material Id is required."],
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  deliveryDate: {
    type: String,
    required: [true, "Delivery Date is required."],
  },
  assignUser: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Assign user Id is required."],
    },
  ],
  indentStatus: {
    type: Boolean,
    default: false,
  },
  purchaseOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PurchaseOrder",
  },
  remarks: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  IssueDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Indent", indentSchema);
