const vendorDetailsSchema = require("@/models/organization/main/vendor/vendor.modal")
const financialDetails = require("@/models/organization/main/vendor/financialdetails")

const getAllvendors = async (req, res) => {
  const { organization } = req.query;
  const {  } = req.query;

  try {
    
    const vendors = await vendorDetailsSchema.find({organization}).populate("financialDetails")
    // const financialDetail = await financialDetails.find({organization})


    return res.status(200).json({
      success: true,
      data: vendors,
      message: "Vendor Fetched Successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
      message: "Error in fetch All Vendors Details.",
    });
  }
};

module.exports = getAllvendors;
