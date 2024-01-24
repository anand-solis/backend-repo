const Site = require("@/models/organization/site/site.model");

const siteInviteMiddleware = async (req, res) => {
    const { site } = req.body;
    const { organization } = req.query;

    const siteDetails = await Site.findOne({ _id: site, organization: organization }).select("_id");

    if(siteDetails?._id){
        next();
    }
    else{
        return res.json({ success: false, error: "You are not a authorized person to invite members." })
    }
}

module.exports = siteInviteMiddleware;