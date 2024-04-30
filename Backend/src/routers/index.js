const express = require("express");
const path = require("path");
const { SuccessResponse } = require("../core/success.response");
const router = express.Router();

router.use("/access", require("./access"));
router.use("/certificate", require("./certificate"));
router.use("/subscription", require("./subscription"));
router.use("/public", express.static(path.join(process.cwd(), "upload")));
module.exports = router;
