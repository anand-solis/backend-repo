const SiteExpenses = require("@/models/organization/main/bills/createExpenses.model");

const CreateSiteExpenses = async (req, res) => {
  const { organization, site } = req.query;
  const { name } = req.body;

  const data = {
    organization: organization,
    site: site,
    name: name,
  };

  try {
    console.log(data);

    const addedSiteBill = await SiteExpenses.create(data);

    return res.status(200).json({
      success: true,
      message: " Expenses Added Successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
      message: "Failed to Add Expenses.",
    });
  }
};

const getSiteExpenses = async (req, res) => {
  const { organization, site } = req.query;
  try {
    const data = await SiteExpenses.find({
      organization: organization,
    });
    return res.status(200).json({
      success: true,

      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
      message: "Failed to get Site Expenses.",
    });
  }
};

const updateSiteExpenses = async (req, res) => {
  const { organization } = req.query;
  const { id } = req.params;
  const name  = req.body;
  try {
    const expensesUpdate = await SiteExpenses.findByIdAndUpdate(
      { _id: id },
       name ,
      { new: true }
    );
    if (!expensesUpdate) {
      return res.status(500).json({
        success: false,
        error: err,
        meassage: "Failed to  Update Expense Category.",
      });
    }
    return res.status(200).json({
      expensesCategpry: expensesUpdate,
      success: true,
      message: "Expense Category Updated Successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
      meassage: "Failed to  Update Expense Category.",
    });
  }
};
module.exports = { CreateSiteExpenses, getSiteExpenses, updateSiteExpenses };
