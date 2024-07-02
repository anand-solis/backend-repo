const materialIssueModels = require("@/models/organization/main/material/materialIssue.model")
const uploadStorageFile = require("@/utils/connections/storage/uploadStorageFile");
const { default: mongoose } = require("mongoose");

const addMaterailIssue = async (req, res) => {
    try {
        const { organization } = req.query;
        let userId = req.user?._id
        const IssuesData = { organization: organization, createdBy: userId };
        const response = await uploadStorageFile(req, ["image"]);
        if (response.success) {
            IssuesData["profile"] = response?.file
        }
        if (response?.fields?.issueType[0] !== undefined) IssuesData["issueType"] = response.fields.issueType[0];
        if (response?.fields?.materialName?.[0] !== undefined) IssuesData["materialName"] = response.fields.materialName[0];
        if (response?.fields?.issueTitle?.[0] !== undefined) IssuesData["issueTitle"] = response.fields.issueTitle[0];
        if (response?.fields?.vendorId?.[0] !== undefined) IssuesData["vendorId"] = response.fields.vendorId[0];
        if (response?.fields?.dueDate?.[0] !== undefined) IssuesData['dueDate'] = response.fields.dueDate[0];
        if (response?.fields?.description?.[0] !== undefined) IssuesData['description'] = response.fields.description[0];
        if (response?.fields?.issueTitle?.[0] !== undefined) IssuesData["issueTitle"] = response.fields.issueTitle[0];
        if (response?.fields?.vendorId?.[0] !== undefined) IssuesData["vendorId"] = response.fields.vendorId[0];

        const issueData = await materialIssueModels.create(IssuesData);

        if (issueData) {
            return res.status(201).json({
                success: true,
                message: "Issue raised successfully.",
            });
        } else {
            return res.status(500).json({
                success: false,
                msg: "Failed to raise issue .",
            });
        }


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            msg: "Failed to Update issue .",
        });
    }
}

const deleteMaterialIssues = async (req, res) => {
    try {
        const { organization, site, issueId } = req.query;
        let issueData
        if (!issueId) {
            return res.status(404).json({
                success: false,
                Error: "",
                message: "Issue ID is required",
            });
        }
        issueData = await materialIssueModels.findById(issueId)
        if (!issueData) {
            return res.status(404).json({
                success: false,
                Error: "",
                message: " Issue Not Found ",
            });
        }
        issueData = await materialIssueModels.findByIdAndDelete(issueId)


        if (issueData) {
            return res.status(200).json({
                success: true,
                message: " Issue delete successfully.",
            });
        } else {
            return res.status(500).json({
                success: false,
                msg: "Failed to Issue deletion .",
            });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            msg: "Failed to Issue deletion .",
            error: err.message,
        });
    }
};

const updateMaterailIssue = async (req, res) => {
    try {

        const { organization, issueId } = req.query;
        if (!issueId) {
            return res.status(404).json({
                success: true,
                message: "Issue ID is required",
            });
        }
        const IssuesData = {};
        const response = await uploadStorageFile(req, ["image"]);
        if (response.success) {
            IssuesData["profile"] = response?.file
        }
        if (response?.fields?.issueType[0] !== undefined) IssuesData["issueType"] = response.fields.issueType[0];
        if (response?.fields?.materialName?.[0] !== undefined) IssuesData["materialName"] = response.fields.materialName[0];
        if (response?.fields?.issueTitle?.[0] !== undefined) IssuesData["issueTitle"] = response.fields.issueTitle[0];
        if (response?.fields?.vendorId?.[0] !== undefined) IssuesData["vendorId"] = response.fields.vendorId[0];
        if (response?.fields?.dueDate?.[0] !== undefined) IssuesData['dueDate'] = response.fields.dueDate[0];
        if (response?.fields?.description?.[0] !== undefined) IssuesData['description'] = response.fields.description[0];
        if (response?.fields?.issueTitle?.[0] !== undefined) IssuesData["issueTitle"] = response.fields.issueTitle[0];
        if (response?.fields?.vendorId?.[0] !== undefined) IssuesData["vendorId"] = response.fields.vendorId[0];

        const issueData = await materialIssueModels.findByIdAndUpdate(issueId, IssuesData);

        if (issueData) {
            return res.status(200).json({
                success: true,
                message: "Issue Update successfully.",
            });
        } else {
            return res.status(500).json({
                success: false,
                msg: "Failed to Update issue .",
            });
        }


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            msg: "Failed to Update issue .",
        });
    }
}

const getMaterailIssues = async (req, res) => {
    try {
        const { organization } = req.query;
        let issueData
        issueData = await materialIssueModels.aggregate([
            {
                '$match': {
                    'organization': new mongoose.Types.ObjectId(organization)
                }
            }, {
                '$lookup': {
                    'from': 'users',
                    'localField': 'createdBy',
                    'foreignField': '_id',
                    'as': 'users'
                }
            }, {
                '$lookup': {
                    'from': 'rootvendors',
                    'localField': 'vendorId',
                    'foreignField': '_id',
                    'as': 'vendors'
                }
            }
        ]);

        if (issueData.length) {
            return res.status(200).json({
                success: true,
                data:issueData,
                message: "Issue found successfully.",
            });
        } else {
            return res.status(500).json({
                success: false,
                data:[],
                msg: "Issue not found",
            });
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            data:[],
            msg: "Issue not found",
        });
    }
}

module.exports = {
    addMaterailIssue,
    deleteMaterialIssues,
    updateMaterailIssue,
    getMaterailIssues
}