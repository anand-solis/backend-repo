const Task = require("@/models/organization/site/task/task.model");

const UpdateTaskController = async (req, res) => {
    try {
        const { taskName, taskNumber, description, workCategory, endDate, startDate, progress } = req.body;
        const { organization, site, floor, task } = req.query;
        let data = await Task.findOneAndUpdate(
            {
                _id: task,
            },
            {
                taskNumber: taskNumber,
                taskName: taskName,
                description: description,
                workCategory: workCategory,
                endDate: endDate,
                startDate: startDate,
                progress: progress
            }
        );
        if (data) {
            return res.status(404).json({ success: false, error: "", message: "Task not updated" });
        }
        return res.status(200).json({ success: true, error: "", message: "Task successfully updated." });
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = UpdateTaskController;