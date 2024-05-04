const express = require("express");
const PlanController = require("../controllers/plan.controller");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.get("/", asyncHandler(PlanController.getAllPlans));

module.exports = router;
