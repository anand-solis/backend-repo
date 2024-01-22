const Member = require("@/models/organization/members.model");
const Feature = require("@/models/app/features.model");
const Plan = require("@/models/organization/plan.model");
const Subscription = require("@/models/app/subscription.model");


const organizationMiddleware = async (req, res, next, key, rule, subscription) => {
    const { organization } = req.query;

    try {
        const member = await Member
            .findOne({ user: req?.user?._id, organization: organization })
            .select("permission")
            .populate("permission")

        if (member?._id) {
            let isRuleValid = null;
            const feature = await Feature.findOne({ key: key }).select("_id");

            if (feature?._id) {

                member?.permission?.features?.map((singleFeature) => {
                    if (singleFeature.feature.toString() == feature._id.toString()) {
                        isRuleValid = singleFeature.permissions[rule]
                    }
                })

                if (isRuleValid) {
                    const plan = await Plan
                        .findOne({ organization: organization })
                        .select("subscription expiry")
                        .populate({
                            path: "subscription",
                            select: subscription
                        });

                    if (plan?._id) {
                        const today = new Date();
                        const dateToCheck = new Date(plan?.expiry);

                        if (!(dateToCheck < today)) {
                            if (plan?.subscription[subscription]) {
                                next();
                            }
                            else {
                                return res.json({ success: false, error: "Error: You don't have permission to do this task, Upgrade your subscription.", message: "" });
                            }
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
                    return res.json({ success: false, error: "Error: You don't have any permissions to do this task, Contact your organization admin.", message: "" });
                }
            }
            else {
                return res.json({ success: false, error: "Error: You don't have this features in your subscription plan.", message: "" })
            }
        }
        else {
            return res.json({ success: false, error: "Error: You are not in this organization.", message: "" });
        }

    } catch (error) {
        return res.json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = organizationMiddleware;