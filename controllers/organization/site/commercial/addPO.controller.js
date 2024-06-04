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

    data["indentId"] = data?.indentId?.map((id) => new mongoose.Types.ObjectId(id))
    const purchaseorder = await PO.create(popayload); 

    return res.status(201).json({
      success: true,
      message: "Purchase order added successfully.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Failed to create Purchase Order.",
    });
  }
};

module.exports = AddPurchaseOrder;
