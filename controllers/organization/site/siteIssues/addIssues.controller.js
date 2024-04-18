const Issues = require("@/models/organization/site/siteIssues/siteIssues.model");

const RaiseIssuesController = async (req, res) => {
  const { organization, site } = req.query;
  const  data  = req.body;
  const IssuesData = { ...data, organization: organization, site: site };
  
  try {
    const issueData = await Issues.create(IssuesData);
    
    if (issueData) {
      return res.status(200).json({
        success: true,
        message: "Issue raised successfully.",
      });
    } else {
      return res.status(500).json({
        success: false,
        msg: "Failed to raise issue .",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Failed to raise issue.",
      error: err.message,
    });
  }
};

module.exports = RaiseIssuesController;
