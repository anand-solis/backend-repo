const Employee = require("@/models/organization/site/attendance/employee/employee.model");

const GetAllEmployeeController = async (req, res) => {
    const { organization, site } = req.query;

    try {
        const employees = await Employee.find({
            organization: organization,
            site: site
        })
        .select("-organization -site -createdAt -updatedAt -__v")
        .populate({
            path: "profile",
            select: "url"
        });

        return res.status(200).json({ employees: employees, success: true, error: "", message: "Employees fetched successfully." });
    } catch (error) {
        return res.status(500).json({ employees: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetAllEmployeeController;