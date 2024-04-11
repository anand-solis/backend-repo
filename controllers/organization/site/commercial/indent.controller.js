const Indent = require("@/models/organization/site/commercial/indent.model");

const AddIndentController = async (req, res) => {
  const { organization, site } = req.query;
  const data = req.body;
  
  const indentpayload = {
    ...data,
    organization: organization,
    site: site,
    createdBy: req.user._id,
  }; 

  try {
    const indentdata = await Indent.create(indentpayload);

    return res.status(201).json({
      indentdata,
      success: true,
      message: "Indent added successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to add Indent",
    });
  }
};

module.exports = AddIndentController;
