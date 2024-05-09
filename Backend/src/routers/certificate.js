const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const authentication = require("../middlewares/authentication");
const CertificateController = require("../controllers/certificate.controller");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/check", asyncHandler(CertificateController.checkCertificate));

router.use("/", authentication);
router.post(
  "/",
  upload.fields([
    { name: "CCCD", maxCount: 1 },
    { name: "face", maxCount: 1 },
  ]),
  asyncHandler(CertificateController.requestCertificate)
);

// router.use('/ca')
router.get("/ca", asyncHandler(CertificateController.getCertRequests));
router.post("/ca", asyncHandler(CertificateController.signCertificate));

module.exports = router;
