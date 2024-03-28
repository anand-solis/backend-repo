const mongoose = require('mongoose');

const termsAndConditionSchema = mongoose.Schema({
    organization :{

        type:mongoose.Schema.Types.ObjectId,
        required:[true ,"Organization is required."]
    },
    vendorId:{

        type:mongoose.Schema.Types.ObjectId,
        required:[true , "vendor Id is required."]
    },
    returnPolicy:{

        type:String
    },
    paymentTerms:{

        type:String
    }
}, { timestamps: true })


module.exports = mongoose.model("termsAndConditionSchema",termsAndConditionSchema)
