const Member = require("@/models/organization/members.model");
const Plan = require("@/models/organization/plan.model");

const organizationMemberMiddleware = async (req, res, next) => {
    const { organization } = req.query;

    try {
        const member = await Member
            .findOne({ user: req?.user?._id, organization: organization })
            .select("permission")
            .populate("permission");

        if (member?._id) {
            const plan = await Plan
                .findOne({ organization: organization })
                .select("expiry");

            if (plan?._id) {
                const today = new Date();
                const dateToCheck = new Date(plan?.expiry);

                if (!(dateToCheck < today)) {
                    next();
                }
                else {
                    return res.json({ success: false, error: "Error: Your organization subscription plan is expired.", message: "" });
                }
            }
            else {
                return res.json({ success: false, error: "Error: You don't have any valid subscription plan.", message: "" });
            }
        }
        else {
            return res.json({ success: false, error: "Error: You are not in this organization.", message: "" });
        }

    } catch (error) {
        return res.json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = organizationMemberMiddleware;