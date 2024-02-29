const Labour = require("@/models/organization/site/attendance/labour/labour.model");

const GetLabourController = async (req, res) => {
    const { organization, site } = req.query;
    const { id } = req.params;

    try {
        const labour = await Labour.findOne({
            _id: id,
            organization: organization,
            site: site
        })
        .select("-organization -site -createdAt -updatedAt -__v")
        .populate({
            path: "profile",
            select: "url"
        });

        return res.status(200).json({ labour: labour, success: true, error: "", message: "Labour fetched successfully." });
    } catch (error) {
        return res.status(500).json({ labour: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetLabourController;