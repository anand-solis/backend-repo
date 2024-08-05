const materialTransferModels = require("@/models/organization/materialTransfer.models")
const uploadStorageFile = require("@/utils/connections/storage/uploadStorageFile")
const getStorageFile = require("@/utils/connections/storage/getStorageFile");
const { default: mongoose } = require("mongoose");

const addMaterialtransfer = async (req, res) => {
    try {
        const { organization, site } = req.query;
        let userId = req.user?._id
        const IssuesData = { organization: organization, createdBy: userId };
        let payload = req.body
        let lastTransferMaterial = await materialTransferModels.aggregate([
            {
                $match: {
                    organization: new mongoose.Types.ObjectId(organization),
                }
            },
            {
                '$sort': {
                    'createdAt': -1
                }
            }, {
                '$limit': 1
            }
        ])
        let transferId
        if (lastTransferMaterial.length) {
            let preTransferId = lastTransferMaterial[0]?.transferId
            if (!preTransferId) {
                transferId = "MI000001"
            } else {
                preTransferId = +preTransferId.split("MI")[1]
                preTransferId = (preTransferId + 1).toString()
                preTransferId = preTransferId.padStart(6, "0")
                transferId = "MI" + preTransferId
            }

        } else {
            transferId = "MI000001"
        }
        IssuesData["transferId"] = transferId
        const issueData = await materialTransferModels.create({ ...IssuesData, ...payload });

        if (issueData) {
            return res.status(201).json({
                success: true,
                message: "Issue raised successfully.",
                data: issueData
            });
        } else {
            return res.status(500).json({
                success: false,
                msg: "Failed to raise issue .",
                data: {}
            });
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            msg: "Failed to raise issue .",
            data: {}
        });
    }
}

const attachFileMaterialtransfer = async (req, res) => {
    try {
        const { organization, id } = req.query;
        let file
        if (!id) {
            return res.status(400).json({
                success: false,
                msg: "Id is required",
                data: {}
            });
        }
        const response = await uploadStorageFile(req, ["image"]);
        if (response.success) {
            file = response?.file
        } else {
            return res.status(500).json({
                success: false,
                msg: "Failed to file add",
            });
        }

        const issueData = await materialTransferModels.findByIdAndUpdate(id, { file, file });
        console.log("lllllllllllllllllll,,,,,,", issueData)

        if (issueData) {
            return res.status(200).json({
                success: true,
                message: "file add successfully.",
            });
        }

        return res.status(500).json({
            success: false,
            msg: "Failed to file add",
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            msg: "Failed to file add",
        });
    }
}

const getMaterialtransfer = async (req, res) => {
    try {
        const { organization, site } = req.query;
        let materialsTranferDetails = await materialTransferModels.aggregate([
            {
                '$match': {
                    'organization': new mongoose.Types.ObjectId(organization)
                }
            },
            {
                '$lookup': {
                    'from': 'files',
                    'localField': 'file',
                    'foreignField': '_id',
                    'as': 'files'
                }
            },
            {
                '$lookup': {
                    'from': 'users', 
                    'localField': 'createdBy', 
                    'foreignField': '_id', 
                    'as': 'createdBy'
                }
            },
            {
                '$lookup': {
                    'from': 'users', 
                    'localField': 'issueTo', 
                    'foreignField': '_id', 
                    'as': 'issueTo'
                }
            },
            {
                '$lookup': {
                    'from': 'users', 
                    'localField': 'checkedBy', 
                    'foreignField': '_id', 
                    'as': 'checkedBy'
                }
            },
            {
                $project:{
                    "createdBy.name":1,
                    "createdBy._id":1,
                    "issueTo.name":1,
                    "issueTo._id":1,
                    "checkedBy.name":1,
                    "checkedBy._id":1,
                    "material":1,
                    "task":1,
                    "file":1

                }
            }
        ])
        // console.log("materialsTranferDetails..............................",materialsTranferDetails)
        // materialsTranferDetails = materialsTranferDetails[0]?.files
        // let fileArray = []
        for (let i = 0; i < materialsTranferDetails?.length; i++) {
            if (materialsTranferDetails[i]?.files?.length) {
                console.log("inside ..............................",i)
                // materialsTranferDetails[i]["file"] = await getStorageFile(materialsTranferDetails[i]?.files[0]?.url);
                let data = await getStorageFile(materialsTranferDetails[i]?.files[0]?.url);
                materialsTranferDetails[i]["file"] = data?.file
                console.log("data.....................................",data)
            }

        }

        if (!materialsTranferDetails.length) {
            return res
                .status(404)
                .json({
                    data: [],
                    success: false,
                    error: "",
                    message: "Data not found ",
                });
        }
        return res
            .status(200)
            .json({
                data: materialsTranferDetails,
                success: true,
                error: "",
                message: "Data found successfully",
            });

        

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            msg: "Failed to find data",
            data: []
        });
    }
}
const deleteMaterialtransfer = async (req, res) => {
    try {
        const { organization, site, id } = req.query;
        if (!id) {
            return res.status(404).json({ data: {}, success: false, error: "", message: "Id is required" });
        }

        let data
        data = await materialTransferModels.findById(id)
        if (!data) {
            return res.status(404).json({ data: {}, success: false, error: "", message: "Data not found" });

        }
        data = await materialTransferModels.findByIdAndDelete(id)
        if (!data) {
            return res.status(404).json({ data: {}, success: false, error: "", message: "Data not deleted" });

        }
        return res.status(200).json({ data: data, success: true, error: "", message: "Data  deleted successfully!" });

    } catch (error) {
        return res.status(500).json({ data: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

const updateMaterialtransfer = async (req, res) => {
    try {
        const { organization, site, id } = req.query;
        let payload = req.body
        if (!id) {
            return res.status(404).json({ data: {}, success: false, error: "", message: "Id is required" });
        }
        let data
        data = await materialTransferModels.findById(id)
        if (!data) {
            return res.status(404).json({ data: {}, success: false, error: "", message: "Data not found" });
        }
        data = await materialTransferModels.findByIdAndUpdate(id,payload,{new:true})
        if (!data) {
            return res.status(404).json({ data: {}, success: false, error: "", message: "Data not updated" });
        }
        return res.status(200).json({ data: data, success: true, error: "", message: "Data  updated successfully!" });

    } catch (error) {
        return res.status(500).json({ data: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = {
    addMaterialtransfer,
    attachFileMaterialtransfer,
    getMaterialtransfer,
    deleteMaterialtransfer,
    updateMaterialtransfer
}