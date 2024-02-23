const WorkCategory = require("@/models/organization/main/workCategory.model");

const UpdateAppWorkCategoryController = async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;

    try {
        await WorkCategory.findOneAndUpdate(
            { _id: id },
            { name: name }
        )

        return res.status(200).json({ success: true, error: "", message: "Work Category updated successfully." });
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = UpdateAppWorkCategoryController;