const mongoose = require("mongoose");
const createOrganization = require("@/controllers/organization/main/createOrganization.controller");
const createDefaultPermissions = require("@/controllers/organization/main/createDefaultPermissions.controller");
const createSubscriptionPlan = require("@/controllers/organization/main/createSubscriptionPlan.controller");
const sendEmailController = require("@/controllers/app/email/sendEmail.controller");
const SuccessCreateOrganization = require("@/templates/emails/SuccessCreateOrganization.template");

const OrganizationController = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { name, email, phone } = req.body;
    
    try {
        const organization = await createOrganization(req, session);

        if (organization.success) {
            await createSubscriptionPlan(organization.id, session);
            await createDefaultPermissions(organization.id, req?.user?._id, session);
            await sendEmailController(email, "Organization Successfully Created", SuccessCreateOrganization(name, email, phone));

            await session.commitTransaction();
            session.endSession();

            return res.json({ success: true, error: "", message: "Organization created successfully." });
        }
        else {
            await session.commitTransaction();
            session.endSession();

            return res.json({ success: organization.success, error: organization.error, message: organization.message });
        }
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        return res.json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = OrganizationController;