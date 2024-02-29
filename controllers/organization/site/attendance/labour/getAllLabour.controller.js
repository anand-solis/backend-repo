const Labour = require("@/models/organization/site/attendance/labour/labour.model");

const GetAllLabourController = async (req, res) => {
    const { organization, site } = req.query;

    try {
        const labours = await Labour.find({
            organization: organization,
            site: site
        })
        .select("-organization -site -createdAt -updatedAt -__v")
        .populate({
            path: "profile",
            select: "url"
        });

        return res.status(200).json({ labours: labours, success: true, error: "", message: "Labours fetched successfully." });
    } catch (error) {
        return res.status(500).json({ labours: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetAllLabourController;