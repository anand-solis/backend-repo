const material = require("@/models/organization/main/material/material.modal");

const getAllmaterialdata = async (req, res) => {
  const { organization } = req.query;

  try {
    const materials = await material.find({ organization: organization });

    return res.status(200).json({
      success: true,
      data: materials,
      message: "Materials found successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to get Material.",
    });
  }
};

module.exports = getAllmaterialdata