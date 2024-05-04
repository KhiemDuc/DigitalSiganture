const { SuccessResponse } = require("../core/success.response");
const PlanService = require("../services/plan.service");

class PlanController {
  static async getAllPlans(req, res) {
    new SuccessResponse({
      data: await PlanService.getPlans(),
    }).send(res);
  }
}

module.exports = PlanController;
