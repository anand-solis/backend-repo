const mongoose = require("mongoose");
const Member = require("@/models/organization/members.model");
const createOrganization = require("@/controllers/organization/createOrganization.controller");
const createPermissions = require("@/controllers/organization/createPermissions.controller");
const createSubscriptionPlan = require("@/controllers/organization/createSubscriptionPlan.controller");

const OrganizationController = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const isPresent = await Member.findOne({ user: req?.user?._id, isCreator: true }).select("_id");

        if (!isPresent?._id) {
            const organization = await createOrganization(req, session);

            if (organization.success) {
                await createSubscriptionPlan(organization.id, session);
                await createPermissions(organization.id, req?.user?._id, session);

                await session.commitTransaction();
                session.endSession();

                res.json({ success: true, error: "", message: "Organization created successfully." });
            }
            else {
                await session.commitTransaction();
                session.endSession();

                res.json({ success: organization.success, error: organization.error, message: organization.message });
            }
        } else {
            await session.abortTransaction();
            session.endSession();

            res.json({ success: false, error: `You can't create more than 1 organization.`, message: "" });
        }
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        res.json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = OrganizationController;