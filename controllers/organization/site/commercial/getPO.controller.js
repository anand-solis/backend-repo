const PO = require("@/models/organization/site/commercial/po.model");

const GetPurchaseOrder = async (req, res) => {
  const { organization, site } = req.query;

  try {
    const POData = await PO.find({ site: site })
      .populate({
        path: "indentId",
        populate: [
          {
            path: "materialId",
          },
          {
            path: "assignUser",
          },
          {
            path: "createdBy",
            select:"name email"
          },
        ],
      })
      .populate({
        path: "vendorId",
        populate: [
          {
            path: "vendor",
          },
          {
            path: "finaicialdetails",
          },
          {
            path: "termsAndCondition",
          },
        ],
        select: "finaicialdetails vendor termsAndCondition",
      });

    return res.status(200).json({
      success: true,
      data: POData,
      message: "Purchase Data Get Successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      Error: err,
      message: "Failed to get Purchase Order.",
    });
  }
};

module.exports = GetPurchaseOrder;
