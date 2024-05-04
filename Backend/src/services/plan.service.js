const planModel = require("../models/plans.model");
const pickFields = require("../utils/pickFields");

class PlanService {
  static async getPlans() {
    const plans = await planModel.find({});
    const result = plans.map((plan) =>
      pickFields(plan, ["_id", "name", "description", "price", "benefit"])
    );
    return result;
  }
}

module.exports = PlanService;
