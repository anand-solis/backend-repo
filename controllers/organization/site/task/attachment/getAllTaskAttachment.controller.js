const TaskAttachment = require("@/models/organization/site/task/taskAttachment.model");

const GetAllTaskAttachmentController = async (req, res) => {
    const { organization, site, floor, task } = req.query;

    try {
        const taskAttachment = await TaskAttachment.find({
            organization: organization,
            site: site,
            floor: floor,
            task: task
        })
        .select("attachment")
        .populate({
            path: "attachment",
            select: "url"
        });

        return res.status(200).json({ taskAttachment: taskAttachment, success: true, error: "", message: "Task attachments successfully fetched." });
    } catch (error) {
        return res.status(500).json({ taskAttachment: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetAllTaskAttachmentController;