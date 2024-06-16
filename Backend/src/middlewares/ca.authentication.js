const { BadRequestError, ForbiddenError } = require("../core/error.response");
const CAModel = require("../models/CA.model");
const asyncHandler = require("../utils/asyncHandler");
const forge = require("node-forge");
const HEADERS = {
  CA_ID: "id",
  SIGNATURE: "signature",
};

const verifySignature = (data, signature, publicKey) => {
  const md = forge.md.sha256.create();
  md.update(data);
  const result = publicKey.verify(md.digest().bytes(), signature);
  return result;
  // const verify = crypto.createVerify("RSA-SHA256");
  // verify.update(data);
  // verify.end();
  // const result = verify.verify(publicKey, buffer);
  // return result;
};

module.exports = asyncHandler(async (req, res, next) => {
  let data = {
    timestamp: req.headers.timestamp,
    ...req.body,
  };
  const signature = forge.util.decode64(req.headers.signature);
  if (!signature)
    throw new ForbiddenError("Không tìm thấy chữ ký", "Không tìm thấy chữ ký");
  const foundCA = await CAModel.findOne({ name: "KnB root CA" });
  const pubKey = foundCA.publicKey;
  const publicKey = forge.pki.publicKeyFromPem(pubKey);
  const result = verifySignature(data, signature, publicKey);
  if (!result) throw new BadRequestError("Chữ ký không hợp lệ");
  next();
});
