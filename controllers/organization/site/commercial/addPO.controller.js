const PO = require("@/models/organization/site/commercial/po.model");
const { default: mongoose } = require("mongoose");

const AddPurchaseOrder = async (req, res) => {
  const { organization, site } = req.query;
  const data = req.body;

  const popayload = {
    ...data,
    organization: organization,
    site: site,
    createdBy: req.user._id,
  };

  try {

    popayload["indentId"] = data?.indentId?.map((ID) => {
      return {id:ID}
    })
    const purchaseorder = await PO.create(popayload); 

    return res.status(201).json({
      success: true,
      data:purchaseorder?._id,
      message: "Purchase order added successfully.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      data:"",
      message: "Failed to create Purchase Order.",
    });
  }
};

module.exports = AddPurchaseOrder;
