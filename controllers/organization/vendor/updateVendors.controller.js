const vendorPersonalDetails = require("@/models/")

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
      .json({
        success: false,
        error: `Error: ${error}`,
        message: "Add Vendor error",
      });
  }
};
