const Subscription = require("@/models/app/subscription.model");

const AddSubscriptionController = async (req, res) => {
    const { title, sub_title, description, price, sites_count, users_count, admin_settings, project_management } = req.body;

    try {
        const newSubscription = new Subscription({
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
        })

        await newSubscription.save();

        return res.status(201).json({ success: true, error: "", message: "New Subscription created successfully." });
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = AddSubscriptionController;