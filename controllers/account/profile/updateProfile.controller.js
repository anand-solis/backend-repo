const User = require("@/models/account/users.model");
const File = require("@/models/file/file.model");
const uploadStorageFile = require("@/utils/connections/storage/uploadStorageFile");
const AssignJWTToken = require("@/controllers/account/login/AssignToken.controller");
const { sqliteInsert, sqliteDelete } = require("@/utils/connections/database/sqlite");

const UpdateProfileController = async (req, res) => {
    try {
        const response = await uploadStorageFile(req, ["image"]);

        if (response.success) {
            const prev = await User.findOne({ _id: req.user._id }).select("profile");

            if (prev?.profile) {
                await File.findOneAndUpdate(
                    { _id: prev.profile },
                    { used: false }
                )
            }

            await User.findOneAndUpdate(
                {
                    _id: req.user._id
                },
                {
                    profile: response.file
                }
            )
        }

        const updatedFields = {};

        if (response?.fields?.name?.[0] !== undefined) updatedFields.name = response.fields.name[0];
        if (response?.fields?.role?.[0] !== undefined) updatedFields.role = response.fields.role[0];

        const updatedUser = await User.findOneAndUpdate(
            { 
                _id: req.user._id
            },
            {
                $set: updatedFields
            }
        );

        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        sqliteInsert(token);
        sqliteDelete();

        const assigned = await AssignJWTToken(updatedUser);

        return res.status(200).json({ token: assigned.token, success: true, error: "", message: "User profile updated successfully." });

    } catch (error) {
        return res.status(500).json({ token: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = UpdateProfileController;