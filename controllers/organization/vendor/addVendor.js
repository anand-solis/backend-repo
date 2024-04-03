const vendorPersonalDetails = require("@/models/organization/main/vendor/vendor.modal")
const vendorFinancialDetails = require("@/models/organization/main/vendor/financialdetails")
const vendorTermsCondition = require("@/models/organization/main/vendor/termsAndCondition")
const vendorProof = require("@/models/organization/main/vendor/uploadProof")
const uploadStorageFile = require("@/utils/connections/storage/uploadStorageFile");
const rootVendor = require('@/models/organization/main/vendor/rootVender.modal')
const addVendorDetails = async (req, res) => {
  const { organization } = req.query;
const vendorData = req.body;

  try {
    let vendorDetails = await vendorPersonalDetails.create({...vendorData});
 await rootVendor.create({vendor:vendorDetails?._id,organization:organization})
    
    return res.status(201).json({
      data:vendorDetails,
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
  const { organization, rootVendorDetails } = req.query;
  const finicalDetails = req.body;

  try {
   let  vendorFinancialDetail = await vendorFinancialDetails.create( {...finicalDetails});
await rootVendor.findOneAndUpdate({ _id: rootVendorDetails?._id, },{ $set: { finaicialdetails: vendorFinancialDetail?._id } },
      { 
          new: true 
      }
  );

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
  const { organization, rootVendorDetails } = req.query;
  const { returnPolicy, paymentTerms } = req.body;

  try {
    let vendor = await vendorTermsCondition.create({
      organization,
    
      returnPolicy,
      paymentTerms,
    });
 
      await rootVendor.findByIdAndUpdate({ _id: rootVendorDetails && vendor?.organization},{ $set : {termsAndCondition:vendorTermsCondition?._id}},{ returnNewDocument: true } );

    return res.status(201).json({
      data:vendor,
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
  const { organization, rootVendorDetails } = req.query;
  try {
    const response = await uploadStorageFile(req, ["image"]);
    if (response?.success) {
     let uploadProofDetails =  await vendorProof.create({
        organization: organization,
        gst: response.file,
        pan: response.file,
        bankdetails: response.file,
        
      });
      await rootVendor.findByIdAndUpdate({ _id: rootVendorDetails },{ $set : {termsAndCondition:vendorProof?._id}},{ returnNewDocument: true } );
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