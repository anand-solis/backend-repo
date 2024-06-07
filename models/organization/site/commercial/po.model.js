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
    type:Array
  },
  poId: {
    type: String,
    required: [true,"poid is required ."],
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
      unitCost: {
        type: Number,
        required: true,
      },
      gst:{
        type: String,
        required: true,
      },
      amount:{
        type: Number,
        required: true,
      }

    },
  ],
  gstType: {
    type: String,
  },
});

module.exports = mongoose.model("PurchaseOrder", PurchaseOrder);
