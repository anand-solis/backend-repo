const Site = require("@/models/organization/site/main/site.model");
const getStorageFile = require("@/utils/connections/storage/getStorageFile");
const { default: mongoose } = require("mongoose");

const deleteSiteDocumentController = async (req, res) => {
    try {
        const { organization, site ,id} = req.query;
        let siteDetails = await Site.findById(site)
        siteDetails = siteDetails?.toObject()
        siteDetails = siteDetails?.siteDocuments
        // let fileArray = []
        for (let i = 0; i < siteDetails?.length; i++) {
            if (siteDetails[i]?.file?.toString() == id ) {
                siteDetails.splice(i,1)
                break;
            }

        }
        siteDetails = await Site.findByIdAndUpdate(site,{
            siteDocuments:siteDetails
        })
        if(siteDetails){
            return res
            .status(200)
            .json({
                // site: fileArray,
                success: true,
                error: "",
                message: "Document Delete successfully",
            }); 
        }
        return res
            .status(404)
            .json({
                // site: fileArray,
                success: false,
                error: "",
                message: "Document not delete ",
            });
    } catch (error) {
        return res
            .status(500)
            .json({
                site: null,
                success: false,
                error: `Error: ${error}`,
                message: "",
            });
    }
};

module.exports = deleteSiteDocumentController;
