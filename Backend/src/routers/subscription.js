const express = require("express");
const authentication = require("../middlewares/authentication");
const asyncHandler = require("../utils/asyncHandler");
const Subscription = require("../controllers/subscription.controller");

const router = express.Router();

router.use(authentication);
router.get("/", asyncHandler(Subscription.getSubscription));
router.post("/", asyncHandler(Subscription.subscribePlan));
router.delete("/", asyncHandler(Subscription.unSubscribe));

router.post("/student", asyncHandler(Subscription.studentSub));
router.post("/student/verify", asyncHandler(Subscription.verifyStudent));
module.exports = router;
