const express = require("express");
const path = require("path");
const router = express.Router();

router.use("/access", require("./access"));
router.use("/certificate", require("./certificate"));
router.use("/subscription", require("./subscription"));
router.use("/public", express.static(path.join(process.cwd(), "upload")));
router.use("/plan", require("./plan"));
router.use("/receive-hook", require("./receive-hook"));
router.use("/ca", require("./ca"));
module.exports = router;
