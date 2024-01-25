const Site = require("@/models/organization/site/site.model");
const SiteMember = require("@/models/organization/site/siteMember.model");

const siteMiddleware = async (req, res, next) => {
    const { organization, site } = req.query;

    const siteDetails = await Site.findOne({ _id: site, organization: organization }).select("_id");

    if(siteDetails?._id){
        const MemberDetails = await SiteMember
        .findOne({ site: siteDetails._id })
        .select("_id member")
        .populate({
            path: "member",
            select: "user",
            match: {
                user: req.user._id
            }
        });

        if(MemberDetails?._id){
            next();
        }
        else{
            return res.status(401).json({ success: false, error: "You are not a member of this site project." });
        }
    }
    else{
        return res.status(204).json({ success: false, error: "This site project not exist in your organization." });
    }
}

module.exports = siteMiddleware;