const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const authentication = require("../middlewares/authentication");
const CertificateController = require("../controllers/certificate.controller");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: "privateUploads/",
  filename: (req, file, cb) => {
    const arr = file.originalname.split(".");
    cb(
      null,
      `${Date.now()}-${Math.round(Math.random() * 1e9)}.${arr[arr.length - 1]}`
    );
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png")
      cb(null, true);
    else cb(new Error("Only images is allowed"), false);
  },
});

router.post("/check", asyncHandler(CertificateController.checkCertificate));

router.use("/", authentication);
router.post(
  "/",
  upload.fields([
    { name: "CCCD", maxCount: 1 },
    { name: "face", maxCount: 1 },
    { name: "CCCDBack", maxCount: 1 },
  ]),
  asyncHandler(CertificateController.requestCertificate)
);

router.get("/request", asyncHandler(CertificateController.getMyRequest));

module.exports = router;
