const asyncHandler = require("../utils/asyncHandler");
const Certificate = require("../models/certificate.model");
const { BadRequestError } = require("../core/error.response");
const forge = require("node-forge");
module.exports = asyncHandler(async function (req, res, next) {
  const user = req.user;
  const userCert = await Certificate.findOne({ userId: user._id });
  if (!userCert)
    throw new BadRequestError(
      "Không tìm thấy chứng chỉ",
      "Không tìm thấy chứng chỉ"
    );
  const { publicKey } = forge.pki.certificateFromPem(userCert.certPem);
  const md = forge.md.sha256.create();
  md.update("Delete Certificate");
  req.certId = userCert._id;
  try {
    const valid = publicKey.verify(
      md.digest().getBytes(),
      forge.util.decode64(req.body.signature)
    );
    if (valid) next();
    else throw new Error();
  } catch (err) {
    throw new BadRequestError("Chữ ký không hợp lệ", "Chữ ký không hợp lệ");
  }
});
