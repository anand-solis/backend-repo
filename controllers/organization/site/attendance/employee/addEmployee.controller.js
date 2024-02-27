const Employee = require("@/models/organization/site/attendance/employee/employee.model");
const upload = require("@/utils/connections/storage/upload");

const AddEmployeeController = async (req, res) => {
    const { organization, site } = req.query;

    const allowedTypes = ["Employee", "Labour"]

    try {
        const response = await upload(req, ["image"]);

        if (allowedTypes.includes(response?.fields?.type[0])) {
            const employee = await Employee.create({
                organization: organization,
                site: site,
                type: response?.fields?.type[0],
                name: response?.fields?.name[0],
                number: response?.fields?.number[0],
                role: response?.fields?.role[0],
                dailyHours: response?.fields?.dailyHours[0],
                payment: response?.fields?.payment[0],
                skills: response?.fields?.skills[0],
                gender: response?.fields?.gender[0]
            })

            if (employee?._id) {
                if (response.success) {
                    await Employee.findOneAndUpdate(
                        {
                            _id: employee?._id,
                            organization: organization,
                            site: site
                        },
                        {
                            profile: response.file
                        }
                    )
                }

                return res.status(200).json({ success: true, error: "", message: "Employee details added successfully." });
            }
            else {
                return res.status(200).json({ success: false, error: "Employee details not added.", message: "" });
            }
        }
        else {
            return res.status(200).json({ success: false, error: "Employee type is not allowed.", message: "" });
        }

    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = AddEmployeeController;