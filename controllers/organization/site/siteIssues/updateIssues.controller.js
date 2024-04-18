const Issues = require("@/models/organization/site/siteIssues/siteIssues.model");

const UpdateIssuesController = async (req, res) => {
  const { organization, site } = req.query;
  const { id } = req.params;
  const { data } = req.body;
  try {
    const issueData = await Issues.findByIdAndUpdate(
      { site: site, id: id },
      data,
      { new: true }
    );

    if (issueData) {
      return res.status(200).json({
        success: true,
        message: "Issue raised successfully.",
      });
    } else {
      return res.status(500).json({
        success: false,
        msg: "Failed to Get issue .",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Failed to Get issue.",
      error: err.message,
    });
  }
};

module.exports = UpdateIssuesController;
