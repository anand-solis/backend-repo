const SiteBillsModel = require("@/models/organization/main/bills/addsitebills.model");

const addsiteBillsController = async (req, res) => {
  const { organization } = req.query;
  const { site, budget } = req.body;
  try {
    const data = {
      organization: organization,
      site: site,
      budget: budget,
    };
    const addedSiteBill = await SiteBillsModel.create(data);
    if (!addedSiteBill) {
      return res.status(500).json({
        success: false,
        message: "Failed to add Site Budget. Send proper payload.",
      });
    }
    return res.status(201).json({
      success: true,
      message: "Site Budget Added Successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
      message: "Failed to add Site Budget",
    });
  }
};

const getsiteBillsController = async (req, res) => {
  const { organization } = req.query;
  try {
    const billsData = await SiteBillsModel.find({
      organization: organization,
    }).populate({
      path: "site",
      select: " _id name startDate endDate ",
    });

    if (billsData) {
      return res.status(200).json({
        success: true,
        data: billsData,
        message: "Site Bills fetch Successfully.",
      });
    }
    return res.status(500).json({
      success: false,
      error: err,
      message: "Failed to Get Site Bills details.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
      message: "Failed to get Site Bills details.",
    });
  }
};

const updateSiteBillsController = async (req, res) => {
  const { organization, site } = req.query;
};
module.exports = { addsiteBillsController, getsiteBillsController };
