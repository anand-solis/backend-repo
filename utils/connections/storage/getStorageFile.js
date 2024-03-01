const storage = require("@/utils/connections/storage/connectStorage");

const getStorageFile = async (key) => {
    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: key,
        Expires: 20
    };

    try {
        const url = storage.getSignedUrl("getObject", params);

        return { file: url, success: true, error: "", message: "File fetched successfully." };
    } catch (error) {
        return { file: null, success: false, error: `Error: ${error}`, message: "" };
    }
}

module.exports = getStorageFile;