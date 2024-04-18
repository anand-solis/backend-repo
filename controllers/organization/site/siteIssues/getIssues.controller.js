const Issues = require("@/models/organization/site/siteIssues/siteIssues.model");

const GetIssuesController = async (req, res) => {
  const { organization, site } = req.query;

  try {
    const issueData = await Issues.find({ site: site }).populate({
        path:"assignUser",
        select:"id name email phone "
    });

    if (issueData) {
      return res.status(200).json({
        issueData:issueData,
        success: true,
        message: "Issue Get successfully.",
      });
    } else {
      return res.status(500).json({
        success: false,
        msg: "Failed to Get your issues .",
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

module.exports = GetIssuesController;
