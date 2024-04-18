const mongoose = require("mongoose");

const IssuesSchema = mongoose.Schema({
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
  assignUser: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Assign user Id is required."],
    },
  ],
  reason: {
    type: String,
    required: [true, "Issue Reason  is required."],
  },
  dueDate: {
    type: String,
    required: [true, "Due Date is required."],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  Files: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
  },
});

module.exports = mongoose.model("Issues", IssuesSchema);
