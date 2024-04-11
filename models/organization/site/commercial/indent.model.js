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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Material",
      required: [true, "Material Id is required."],
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
  purchaseOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PurchaseOrder",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Indent", indentSchema);
