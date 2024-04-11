const Indent = require("@/models/organization/site/commercial/indent.model");

const GetIndent = async (req, res) => {
  const { organization, site } = req.query;

  try {
    const Indentdata = await Indent.find({ site: site })
      .populate({
        path: "materialId",
        select: "materialName brandName uom unitCost description ",
      })
      .populate({ path: "purchaseOrder", select: "" });
    return res.status(200).json({
      success: true,
      data: Indentdata,
      message: "Indent Data Get Successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      Error: err,
      message: "Failed to get Indent.",
    });
  }
};

module.exports = GetIndent;