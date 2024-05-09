const express = require("express");
const caAuth = require("../middlewares/ca.authentication");
const asyncHandler = require("../utils/asyncHandler");
const CertificateController = require("../controllers/certificate.controller");
const router = express.Router();
router.use("/", caAuth);
router.get("/certificate", asyncHandler(CertificateController.getCertRequests));
router.post(
  "/certificate",
  asyncHandler(CertificateController.signCertificate)
);
// router.get('/user', get user)
// router.get('/payment', get list success payment)
module.exports = router;
