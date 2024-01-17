const Plan = require("@/models/organization/plan.model");

const createSubscriptionPlan = async (organizationId) => {
    const trialSubscriptionId = "65a751829c2fe4763a5deca0";
    
    var currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);
    
    var nextMonthDate = new Date(currentDate);
    nextMonthDate.setUTCMonth(currentDate.getUTCMonth() + 1);

    try{
        const NewPlanAssign = new Plan({
            subscription: trialSubscriptionId,
            organization: organizationId,
            expiry: nextMonthDate
        });
    
        await NewPlanAssign.save();

        return { success: true, error: "", message: "Subscription assigned successfully." }
    } catch (error){
        return { success: false, error: `Error: ${error}`, message: "" }
    }
}

module.exports = createSubscriptionPlan;