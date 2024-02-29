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

        const updatedFields = {};

        if (response?.fields?.name?.[0] !== undefined) updatedFields.name = response.fields.name[0];
        if (response?.fields?.number?.[0] !== undefined) updatedFields.number = response.fields.number[0];
        if (response?.fields?.role?.[0] !== undefined) updatedFields.role = response.fields.role[0];
        if (response?.fields?.dailyHours?.[0] !== undefined) updatedFields.dailyHours = response.fields.dailyHours[0];
        if (response?.fields?.payment?.[0] !== undefined) updatedFields.payment = response.fields.payment[0];
        if (response?.fields?.skills?.[0] !== undefined) updatedFields.skills = response.fields.skills[0];
        if (response?.fields?.gender?.[0] !== undefined) updatedFields.gender = response.fields.gender[0];

        await Employee.findOneAndUpdate(
            {
                _id: id,
                organization: organization,
                site: site
            },
            {
                $set: updatedFields
            }
        )

        return res.status(200).json({ success: true, error: "", message: "Employee details updated successfully." });

    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = UpdateEmployeeController;