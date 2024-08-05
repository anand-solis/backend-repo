const mongoose = require("mongoose");

const materialTranferSchema = mongoose.Schema({
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    issueTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    checkedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    site: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Site",
    },
    materialIssueTo: {
        type: String,
        required: true,
        enum: ["Sub Contractor", "Orther Site"]
    },
    materialIssueCategory: {
        type: String,
        
    },
    material: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Material",
                required: [true, "Material Id is required."], // Replace 'OtherModel' with the actual name of the referenced model
            },
            transferQuantity: {
                type: Number,
                required: true,
            },
            name:{
                type:String,
                required:true
            }
        },
    ],
    task: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Task",
                required: [true, "Task Id is required."], // Replace 'OtherModel' with the actual name of the referenced model
            },
            discription: {
                type: String,
            },
            name:{
                type:String,
                required:true
            }
        },
    ],
    remark: {
        type: String
    },
    transferId: {
        type: String,
        required: true
    },
    file: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File"
    },
}, { timestamps: true });

module.exports = mongoose.model("material_tranfer", materialTranferSchema);