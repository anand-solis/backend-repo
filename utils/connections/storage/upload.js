const storage = require("@/utils/connections/storage/connectStorage");
const formidable = require("formidable");
const fs = require("fs");
const File = require("@/models/file/file.model");

const upload = async (req, allowed) => {
    try {
        const form = new formidable.IncomingForm();
        const parseForm = () => {
            return new Promise((resolve, reject) => {
                form.parse(req, (err, fields, files) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ files });
                    }
                });
            });
        };

        const { files } = await parseForm();

        if (files.attachment[0]) {
            let { organization } = req.query;
            let mime = files.attachment[0].mimetype;
            let type = mime.split("/")[0]
            let extension = mime.split("/").pop();
            let size = files.attachment[0].size;
            let path = Date.now() + "." + extension;
            let file = files.attachment[0].filepath;
            let name = files.attachment[0].originalFilename;
            let createdBy = req.user._id;
            let updatedBy = req.user._id;

            const rules = {
                image: {
                    size: 5000000, // 5MB
                    extension: ["png", "jpeg", "jpg"]
                },
                doc: {
                    size: 10000000, // 10MB
                    extension: ["docs", "pdf", "excel"]
                },
                video: {
                    size: 100000000, // 100MB
                    extension: ["mp4", "mkv"]
                }
            }

            if (allowed.includes("image") && type == "image" && !rules.image.extension.includes(extension)) {
                return { file: null, success: false, error: "Only these extensions allowed for image upload (png, jpeg, jpg).", message: "" };
            }

            if (allowed.includes("application") && type == "application" && !rules.doc.extension.includes(extension)) {
                return { file: null, success: false, error: "Only these extensions allowed for document upload (docs, pdf, excel).", message: "" };
            }

            if (allowed.includes("video") && type == "video" && !rules.video.extension.includes(extension)) {
                return { file: null, success: false, error: "Only these extensions allowed for video upload (mp4, mkv).", message: "" };
            }

            const params = {
                Bucket: process.env.S3_BUCKET,
                Key: path,
                Body: fs.createReadStream(file),
                ContentType: extension,
                ContentLength: size
            };

            await storage.putObject(params).promise();

            const addedFile = await File.create({
                organization: organization,
                name: name,
                alternative_text: name,
                caption: name,
                extension: extension,
                mime: mime,
                size: size,
                url: path,
                createdBy: createdBy,
                updatedBy: updatedBy,
                used: true
            })

            return { file: addedFile?._id, success: true, error: "", message: "File uploaded successfully." };
        }
        else {
            return { file: null, success: false, error: "Please select a file for uploading to media library.", message: "" };
        }
    } catch (error) {
        return { file: null, success: false, error: `Error: ${error}`, message: "" };
    }
}

module.exports = upload;