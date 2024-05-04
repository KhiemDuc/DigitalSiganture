const planModel = require("../models/plans.model");

class PlanService {
  static async getPlans() {
    const plans = await planModel.find({});
    return plans;
  }
}

module.exports = PlanService;
