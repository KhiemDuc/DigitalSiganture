const express = require("express");
const path = require("path");
const asyncHander = require("../utils/asyncHandler");
const router = express.Router();
router.get(
  "/:name",
  asyncHander(async (req, res) => {
    console.log(path.join(process.cwd(), "privateUploads", req.params.name));
    res.json("ok");
  })
);

module.exports = router;
