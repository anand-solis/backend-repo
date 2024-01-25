const Plan = require("@/models/organization/plan.model");

const getPlanController = async (req, res) => {
    const { organization } = req.query;

    try {
        const plan = await Plan
            .findOne({ organization: organization })
            .select("subscription expiry")
            .populate("subscription");

        return res.json({ plan: plan, success: true, error: "", message: "Plan details fetched successfully." });
    } catch (error) {
        return res.json({ plan: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = getPlanController;