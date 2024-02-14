const WorkCategory = require("@/models/organization/workCategory.model");


const AddWorkCategoryController = async (req, res) => {
    const { organization } = req.query;
    const { name } = req.body;

    try {
        await WorkCategory.create({
            organization: organization,
            name: name,
            createdBy: req.user._id
        });

        return res.status(201).json({ success: true, error: "", message: "Work Category added successfully." });
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = AddWorkCategoryController;