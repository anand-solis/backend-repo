const mongoose = require("mongoose");

const PurchaseOrder = mongoose.Schema({
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
  site: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Site",
    required: true,
  },
  indentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Indent",
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "rootVendor",
    required: true,
  },
  expectedDelivery: {
    type: String,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  poNumber: {
    type: String,
  },
  poStatus: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("PurchaseOrder", PurchaseOrder);
