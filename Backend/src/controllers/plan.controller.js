const {
  SuccessResponse,
  CreatedResponse,
} = require("../core/success.response");
const PlanService = require("../services/plan.service");

class PlanController {
  static async getAllPlans(req, res) {
    new SuccessResponse({
      data: await PlanService.getPlans(),
    }).send(res);
  }
  static async addPlan(req, res) {
    new CreatedResponse({
      data: await PlanService.addPlan(req.body),
    }).send(res);
  }
  static async updatePlan(req, res) {
    new SuccessResponse({
      data: await PlanService.updatePlan(req.params.id, req.body),
    }).send(res);
  }
  static async deletePlan(req, res) {
    new SuccessResponse({
      data: await PlanService.deletePlan(req.params.id),
    }).send(res);
  }
}

module.exports = PlanController;
