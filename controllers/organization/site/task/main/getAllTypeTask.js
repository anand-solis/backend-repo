const TaskMember = require("@/models/organization/site/task/taskMember.model");
const Task = require("@/models/organization/site/task/task.model");
const SiteMember = require("@/models/organization/site/main/siteMember.model");
const TaskTimeline = require("@/models/organization/site/task/taskTimeline.model");
const mongoose = require('mongoose')

const GetAllTypeTaskController = async (req, res) => {

    try {
    const { organization, site, floor ,type} = req.query;
        if(!type){
            return res.status(404).json({ data:[] , success: false, error: "", message: "Task type is required" });
        }
        let match = {
            organization:new  mongoose.Types.ObjectId(organization),
            site: new mongoose.Types.ObjectId(site),
            floor:new  mongoose.Types.ObjectId(floor)

        }
        if(type == "Upcoming"){
            match["progress"] = 0
        }
        else if(type == "Completed"){
            match["progress"] = 100
        }
        else if(type == "Current"){
            match["$and"] = [{progress:{$gt:0}},{progress:{$lt:100}}]
        }
        else if(type == "Delayed"){
            match["$and"] = [{endDate:{$lt:new Date()}},{progress:{$lt:100}}]

        }
        let data
        data = await Task.aggregate([
            {
                $match:match
            },
            {
                '$lookup': {
                    'from': 'workcategories', 
                    'localField': 'workCategory', 
                    'foreignField': '_id', 
                    'as': 'result'
                }
            }
        ])
        console.log('data...........................',data.length)
        if(!data.length){
            return res.status(404).json({ data:[] , success: false, error: "", message: "Data not found" });

        }
        return res.status(200).json({ data:data , success: true, error: "", message: "Data  found successfully!" });

    } catch (error) {
        return res.status(500).json({ tasks: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetAllTypeTaskController;