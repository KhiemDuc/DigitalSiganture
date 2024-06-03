const express = require("express");
const path = require("path");
const asyncHandler = require("../utils/asyncHandler");
const fs = require("fs");
const CertificateController = require("../controllers/certificate.controller");
const AccessController = require("../controllers/access.controller");
const router = express.Router();
// router.use("/", caAuth);
router.get("/certificate", asyncHandler(CertificateController.getCertRequests));
router.post(
  "/certificate",
  asyncHandler(CertificateController.signCertificate)
);

router.get("/user", asyncHandler(AccessController.getListUser));

router.get("/img/:name", (req, res) => {
  const imgPath = path.join(process.cwd(), "privateUploads", req.params.name);
  const base64Img = fs.readFileSync(imgPath).toString("base64");
  res.setHeader("Content-Type", "image/jpg");
  res.send(`data:image/jpeg;base64,${base64Img}`);
});
module.exports = router;
