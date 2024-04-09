const materialSchema = require("@/models/organization/main/material/material.modal");

const addMaterial = async (req, res) => {
  const { organization } = req.query;
  const data = req.body;
  try {
    const material = await materialSchema.create({ ...data, organization:organization });

    // Return success response
    return res.status(200).json({
      success: true,
      data: material,
      message: "Material created successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: `Error: ${err}`,
      message: "Failed to create Material.",
    });
  }
};

module.exports = addMaterial ; 
