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
  poId: {
    type: String,
    required: true,
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
  billingDetails: {
    type: String,
    required: true,
  },
  poStatus: {
    type: Boolean,
    default: false,
  },
  termsandcondition: {
    type: String,
  },
  remarks: {
    type: String,
  },
  material: [
    {
      itemDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Material",
        required: [true, "Material Id is required."], // Replace 'OtherModel' with the actual name of the referenced model
      },
      quantity: {
        type: Number,
        required: true,
      },
      rate: {
        type: Number,
        required: true,
      },
      gst:{
        type: Number,
        required: true,
      },
      amount:{
        type: Number,
        required: true,
      }

    },
  ],
});

module.exports = mongoose.model("PurchaseOrder", PurchaseOrder);
