const Employee = require("@/models/organization/site/attendance/employee/employee.model");

const GetEmployeeController = async (req, res) => {
    const { organization, site } = req.query;
    const { id } = req.params;

    try {
        const employee = await Employee.findOne({
            _id: id,
            organization: organization,
            site: site
        })
        .select("-organization -site -createdAt -updatedAt -__v")
        .populate({
            path: "profile",
            select: "url"
        });

        return res.status(200).json({ employee: employee, success: true, error: "", message: "Employee fetched successfully." });
    } catch (error) {
        return res.status(500).json({ employee: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetEmployeeController;