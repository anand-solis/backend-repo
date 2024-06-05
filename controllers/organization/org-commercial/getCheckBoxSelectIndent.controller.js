const Indent = require("@/models/organization/site/commercial/indent.model");
const { default: mongoose } = require("mongoose");

const checkBoxSelectIndents = async (req, res) => {
  const { organization, site } = req.query;


  try {
    let payload = req.body.indentId
    let indentId
    console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkk",payload)
    // indentId = payload?.map((id)= > new mongoose.Types.ObjectId(id))
    indentId = payload?.map((id)=> new mongoose.Types.ObjectId(id))
    const Indentdata = await Indent.find({ organization: organization ,_id:{$in:indentId}})
      .populate({
        path: "site",
        select: "id name ",
      })
      .populate({
        path: "materialId.material",
        select: " -_id materialName brandName uom unitCost description ",
      })
      .populate({ path: "purchaseOrder", select: "" })
      .populate({ path: "createdBy", select: "-_id email phone name " })
      .populate({ path: "assignUser", select: "-_id email phone name" });
    return res.status(200).json({
      success: true,
      data: Indentdata,
      message: "Indent Data Get Successfully.",
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      Error: err,
      message: "Failed to get Indent.",
    });
  }
};

module.exports = checkBoxSelectIndents;
