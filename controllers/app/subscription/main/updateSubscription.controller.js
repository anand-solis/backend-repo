const Subscription = require("@/models/app/subscription.model");

const UpdateSubscriptionController = async (req, res) => {
    const { id } = req.params;
    const { title, sub_title, description, price, sites_count, users_count, admin_settings, project_management } = req.body;

    try {
        await Subscription.findOneAndUpdate(
            { _id: id },
            {
                title: title,
                sub_title: sub_title,
                description: description,
                price: price,
                sites_count: sites_count,
                users_count: users_count,
                permissions: {
                    admin_settings: admin_settings,
                    project_management: project_management
                }
            }
        )

        return res.status(200).json({ success: true, error: "", message: "Subscription updated successfully." });
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = UpdateSubscriptionController;