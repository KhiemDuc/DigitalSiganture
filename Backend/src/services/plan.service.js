const { BadRequestError } = require("../core/error.response");
const planModel = require("../models/plans.model");
const pickFields = require("../utils/pickFields");

class PlanService {
  static async getPlans() {
    const plans = await planModel.find({});
    const result = plans.map((plan) =>
      pickFields(plan, [
        "_id",
        "name",
        "description",
        "price",
        "benefits",
        "tier",
      ])
    );
    return result;
  }
  static async addPlan({
    name,
    price,
    description,
    isDefault = false,
    tier,
    benefits = [],
  }) {
    if (!name || price == null)
      throw new BadRequestError("Bạn nhập thiếu thông tin");
    try {
      const newPlan = await planModel.create({
        name,
        price,
        description,
        isDefault,
        tier,
        benefits,
      });
      return newPlan;
    } catch (error) {
      throw new BadRequestError("Lỗi không xác định");
    }
  }
  static async updatePlan(
    id,
    { name, price, description, isDefault = false, tier, benefits = [] }
  ) {
    if (!name || price == null)
      throw new BadRequestError("Bạn nhập thiếu thông tin");
    const foundPlan = await planModel.findById(id);
    if (!foundPlan) throw new BadRequestError("Không tìm thấy plan để sửa");
    foundPlan.name = name;
    foundPlan.price = price;
    foundPlan.description = description;
    foundPlan.isDefault = isDefault;
    foundPlan.tier = tier;
    foundPlan.benefits = benefits;
    await foundPlan.save();
    return;
  }

  static async deletePlan(id) {
    const foundPlan = await planModel.findByIdAndDelete(id);
    if (!foundPlan) throw new BadRequestError("Plan id không hợp lệ");
    return foundPlan;
  }
}

module.exports = PlanService;
