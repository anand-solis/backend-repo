const Attendance = require("@/models/organization/site/attendance/main/attendance.model");
const Calendar = require("@/models/organization/site/attendance/main/calendar.model");
const moment = require("moment");

const MarkAttendanceController = async (req, res) => {
    const { organization, site } = req.query;
    const { date, employees } = req.body;

    try {
        const selectedDate = moment(date, "DD-MM-YYYY");

        if (!selectedDate.isValid()) return res.status(200).json({ success: false, error: "Selected date is invalid.", message: "" });
        if (selectedDate.isAfter(moment(), "day")) return res.status(200).json({ success: false, error: "Selected date is in the future.", message: "" });

        const calendar = await Calendar.findOneAndUpdate(
            { organization: organization, site: site, date: date },
            { $setOnInsert: { createdBy: req.user._id }, $set: { date: date } },
            { new: true, upsert: true }
        );

        const attendancePromises = employees.map(async (employee) => {
            return Attendance.findOneAndUpdate(
                { organization: organization, site: site, calendar: calendar._id, employee: employee._id },
                { availability: employee.availability },
                { new: true, upsert: true }
            );
        });

        await Promise.all(attendancePromises);

        return res.status(201).json({ success: true, error: "", message: "Attendance Marked successfully." });
    } catch (error) {
        return res.status(500).json({ attendance: null, exist: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = MarkAttendanceController;