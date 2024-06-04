const Site = require("@/models/organization/site/main/site.model");
const { default: mongoose } = require("mongoose");
const addSiteMembers = async (req, res) => {
    const { organization, site } = req.query;
    console.log(organization, site);
  
    try {
        let payload = req.body
        console.log("payload...................",payload)
      let membersId = req.body?.membersId?.length? req.body?.membersId :[]
      if(!membersId.length){
        
      return res
      .status(400)
      .json({
        success: false,
        error: "",
        message: "Site Members is Required",
      });
      }
      membersId = membersId?.map((id)=> new mongoose.Types.ObjectId(id))
      const siteDetails = await Site.findOneAndUpdate({
        _id: site,
        organization: organization,
      },
      {siteMember:membersId}
    )
       
      if (!siteDetails) {
        return res
        .status(404)
        .json({
          site: siteDetails,
          success: true,
          error: "",
          message: "Site Member not Add",
        });
      }
      // const profile = await getStorageFile(siteDetails.profile.url);
      // siteDetails.profile.url = profile.file;
  
      return res
        .status(200)
        .json({
          site: siteDetails,
          success: true,
          error: "",
          message: "Site Members Added successfully.",
        });
    } catch (error) {
        console.log(error)
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

module.exports = addSiteMembers;
