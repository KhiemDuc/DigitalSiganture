const express = require("express");
const path = require("path");
const asyncHandler = require("../utils/asyncHandler");
const fs = require("fs");
const CertificateController = require("../controllers/certificate.controller");
const AccessController = require("../controllers/access.controller");
const PlanController = require("../controllers/plan.controller");
const router = express.Router();
const caAuth = require("../middlewares/ca.authentication");
const SigningHistoryController = require("../controllers/signingHistory.controller");
router.use("/", caAuth);
router.get("/certificate", CertificateController.getListCert);
router.get(
  "/certificate/request",
  asyncHandler(CertificateController.getCertRequests)
);
router.post(
  "/certificate",
  asyncHandler(CertificateController.signCertificate)
);

router.patch(
  "/certificate/:id",
  asyncHandler(CertificateController.rejectCertificate)
);
router.delete(
  "/certificate/:id",
  asyncHandler(CertificateController.deleteCertByCa)
);

router.get("/user", asyncHandler(AccessController.getListUser));
router.patch("/user/:id", asyncHandler(AccessController.toggleLock));
router.get("/img/:name", (req, res) => {
  const imgPath = path.join(process.cwd(), "privateUploads", req.params.name);
  const base64Img = fs.readFileSync(imgPath).toString("base64");
  res.setHeader("Content-Type", "image/jpg");
  res.send(`data:image/jpeg;base64,${base64Img}`);
});

router.post("/plan", asyncHandler(PlanController.addPlan));
router.put("/plan/:id", asyncHandler(PlanController.updatePlan));
router.delete("/plan/:id", asyncHandler(PlanController.deletePlan));

// Lịch sử ký/từ chối
router.get(
  "/history",
  asyncHandler(SigningHistoryController.getSigningHistory)
);

module.exports = router;
