const TaskPhoto = require("@/models/organization/site/task/taskPhoto.model");

const GetAllTaskPhotoController = async (req, res) => {
    const { organization, site, floor, task } = req.query;

    try {
        const taskPhotos = await TaskPhoto.find({
            organization: organization,
            site: site,
            floor: floor,
            task: task
        })
        .select("photo")
        .populate({
            path: "photo",
            select: "url"
        });

        return res.status(200).json({ taskPhotos: taskPhotos, success: true, error: "", message: "Task photos successfully fetched." });
    } catch (error) {
        return res.status(500).json({ taskPhotos: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetAllTaskPhotoController;