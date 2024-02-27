const Employee = require("@/models/organization/site/attendance/employee/employee.model");
const File = require("@/models/file/file.model");
const upload = require("@/utils/connections/storage/upload");

const UpdateEmployeeController = async (req, res) => {
    const { organization, site } = req.query;
    const { id } = req.params;

    try {
        const response = await upload(req, ["image"]);

        if (response.success) {
            const prev = await Employee.findOne({
                _id: id,
                organization: organization,
                site: site
            }).select("profile");

            if (prev?.profile) {
                await File.findOneAndUpdate(
                    { organization: organization, _id: prev.profile },
                    { used: false }
                )
            }

            await Employee.findOneAndUpdate(
                {
                    _id: id,
                    organization: organization,
                    site: site
                },
                {
                    profile: response.file
                }
            )
        }

        await Employee.findOneAndUpdate(
            {
                _id: id,
                organization: organization,
                site: site
            },
            {
                name: response?.fields?.name[0],
                number: response?.fields?.number[0],
                role: response?.fields?.role[0],
                dailyHours: response?.fields?.dailyHours[0],
                payment: response?.fields?.payment[0],
                skills: response?.fields?.skills[0],
                gender: response?.fields?.gender[0]
            }
        )

        return res.status(200).json({ success: true, error: "", message: "Employee details updated successfully." });

    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = UpdateEmployeeController;