const mongoose = require("mongoose");

const PurchaseOrder = mongoose.Schema({
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
  siteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Site",
    required: true,
  },
  indentId:{
    type: mongoose.Schema.Types.ObjectId,
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Site",
    required: true,
  },
  expectedDelivery: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  poNumber: {
    type: String,
  },
});

module.exports = mongoose.model('PurchaseOrder' , PurchaseOrder);