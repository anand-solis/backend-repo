const mongoose = require('mongoose');
const FinancialSchema = require('@/models/organization/main/vendor/financialdetails');
const TermsAndConditionSchema = require('@/models/organization/main/vendor/termsAndCondition');
const UploadProofSchema = require('@/models/organization/main/vendor/uploadProof');

const vendorDetailsSchema = mongoose.Schema({
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        default: null  // Set default value to null for optional field
    },
    vendorName: {
        type: String,
        required: [true, "Vendor Name is required."]
    },
    address: {
        type: String,
        required: [true, "Business Address is required."]
    },
    vendorLevel: String, 
    vendorType: String, 
    contactPerson: {
        type: String,
        required: [true, "Contact Person is required."]
    },
    designation: String,
    contactNo: {
        type: Number,
        required: [true, "Contact Number is required."]
    },
    vendorEmail: {
        type: String,
        required: [true, "Vendor email is required."]
    },
    financialDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FinancialSchema", // Corrected model name
        default: null  
    },
    termsAndCondition: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TermsAndConditionSchema', // Corrected model name
        default: null 
    },
    uploadProof: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UploadProofSchema', // Corrected model name
        default: null  
    }
}, { timestamps: true });

module.exports = mongoose.model("VendorDetails", vendorDetailsSchema);
