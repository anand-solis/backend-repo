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

            const emailParams = {
                email: `${req.user.email.address}, ${email}`,
                subject: "Organization Successfully Created",
                content: SuccessCreateOrganization(name, email, phone)
            }

            console.log(emailParams);
            
            await sendEmailController(emailParams);

            await session.commitTransaction();
            session.endSession();

            return res.status(201).json({ success: true, error: "", message: "Organization created successfully." });
        }
        else {
            await session.commitTransaction();
            session.endSession();

            return res.status(200).json({ success: organization.success, error: organization.error, message: organization.message });
        }
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = OrganizationController;