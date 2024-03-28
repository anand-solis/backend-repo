const vendorPersonalDetails = require("@/models/organization/main/vendor/vendor.modal")
const vendorFinancialDetails = require("@/models/organization/main/vendor/financialdetails")
const vendorTermsCondition = require("@/models/organization/main/vendor/termsAndCondition")
const vendorProof = require("@/models/organization/main/vendor/uploadProof")
const uploadStorageFile = require("@/utils/connections/storage/uploadStorageFile");

const addVendorDetails = async (req, res) => {
  const { organization } = req.query;
  const {
    vendorName,
    address,
    vendorLevel,
    vendorType,
    designation,
    vendorEmail,
    contactNo,
    contactPerson,
  } = req.body;

  try {
    await vendorPersonalDetails.create({
      organization: organization, // ObjectId of the organization
      vendorName: vendorName,
      address: address,
      vendorLevel: vendorLevel,
      vendorType: vendorType,
      contactPerson: contactPerson,
      designation: designation,
      contactNo: contactNo, // Contact Number
      vendorEmail: vendorEmail, // Vendor Email
    });

    return res.status(201).json({
      success: true,
      error: "",
      message: "Vendor Details added successfully.",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: `Error: ${error}`, message: "Add Vendor error" });
  }
};

const addvendorFinancialDetails = async (req, res) => {
  const { organization, vendorId } = req.query;
  const {
    gstTreatment,
    gstIn,
    bankName,
    accountHolder,
    accountNumber,
    IFSCcode,
  } = req.body;

  try {
    await vendorFinancialDetails.create({
      organization,
      vendorId,
      gstTreatment,
      gstIn,
      bankName,
      accountHolder,
      accountNumber,
      IFSCcode,
    });
    return res.status(201).json({
      success: true,
      error: "",
      message: "Vendor Financial Details added successfully.",
    });
  } catch (err) {
    return res
      .status(500)
      .json({
        success: false,
        error: `Error: ${err}`,
        message: "Send Proper Payload.",
      });
  }
};
const addTermsandConditionDetails = async (req, res) => {
  const { organization, vendorId } = req.query;
  const { returnPolicy, paymentTerms } = req.body;

  try {
    await vendorTermsCondition.create({
      organization,
      vendorId,
      returnPolicy,
      paymentTerms,
    });
    return res.status(201).json({
      success: true,
      error: "",
      message: "Terms and Condition added successfully.",
    });
  } catch (err) {
    return res
      .status(500)
      .json({
        success: false,
        error: `Error: ${err}`,
        message: "Send Proper Payload.",
      });
  }
};

const uploadproof = async (req, res) => {
  const { organization, vendorId } = req.query;

  try {
    const response = await uploadStorageFile(req, ["image"]);

    if (response?.success) {
      await vendorProof.create({
        organization: organization,
        vendorId: vendorId,
        gst: response.file,
        pan: response.file,
        bankdetails: response.file,
        
      });

      return res
        .status(201)
        .json({
          success: true,
          error: "",
          message: "Vendor proof photo successfully created.",
        });
    } else {
      return res
        .status(200)
        .json({
          success: response?.success,
          error: response?.error,
          message: response?.message,
        });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: `Error: ${err}`,
      message: "Send Proper Payload.",
    });
  }
};
module.exports = {
  addVendorDetails,
  addvendorFinancialDetails,
  addTermsandConditionDetails,
  uploadproof,
};
