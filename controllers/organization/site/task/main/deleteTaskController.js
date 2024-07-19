const TaskMember = require("@/models/organization/site/task/taskMember.model");
const Task = require("@/models/organization/site/task/task.model");
const mongoose = require('mongoose')

const deleteTaskController = async (req, res) => {
    try {
        const { organization, site, floor, id } = req.query;
        if (!id) {
            return res.status(404).json({ data: {}, success: false, error: "", message: "Id is required" });
        }

        let data
        data = await Task.findById(id)
        if (!data) {
            return res.status(404).json({ data: {}, success: false, error: "", message: "Data not found" });

        }
        data = await Task.findByIdAndDelete(id)
        if (!data) {
            return res.status(404).json({ data: {}, success: false, error: "", message: "Data not deleted" });

        }
        return res.status(200).json({ data: data, success: true, error: "", message: "Data  deleted successfully!" });

    } catch (error) {
        return res.status(500).json({ data: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = deleteTaskController;