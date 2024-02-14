const Task = require("@/models/organization/site/task/task.model");
const TaskMember = require("@/models/organization/site/task/taskMember.model");
const Member = require("@/models/organization/member.model");

const AddTaskController = async (req, res) => {
    const { number, work_category, endDate, startDate, budget } = req.body;
    const { organization, site, floor } = req.query;

    try {
        const newTask = await Task.create({
            number: number,
            work_category: work_category,
            endDate: endDate,
            startDate: startDate,
            budget: budget,
            organization: organization,
            site: site,
            floor: floor,
            createdBy: req?.user?._id
        });

        if (newTask?._id) {
            const OrganizationMember = await Member.findOne({ organization: organization, user: req.user._id }).select("_id");

            if (OrganizationMember?._id) {
                await TaskMember.create({
                    task: newTask?._id,
                    site: site,
                    floor: floor,
                    organization: organization,
                    member: OrganizationMember._id,
                    isCreator: true
                })

                return res.status(201).json({ task: newTask?._id, success: true, error: "", message: "Task successfully created." });
            }
            else{
                return res.status(401).json({ task: null, success: false, error: "You are not a member of this organization.", message: "" });
            }
        }
        else {
            return res.status(400).json({ task: null, success: false, error: "Task not created.", message: "" });
        }

    } catch (error) {
        return res.status(500).json({ site: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = AddTaskController;