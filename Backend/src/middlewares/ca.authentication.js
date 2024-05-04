const CAModel = require("../models/CA.model");
const asyncHandler = require("../utils/asyncHandler");
const crypto = require("crypto");
const HEADERS = {
  CA_ID: "id",
  SIGNATURE: "signature",
};

const verifySignature = (data, signature, publicKey) => {
  const verify = crypto.createVerify("RSA-SHA256");
  verify.update(JSON.stringify(data));
  verify.end();
  const result = verify.verify(publicKey, signature, "hex");
  return result;
};

module.exports = asyncHandler(async (req, res, next) => {
  const CA_ID = req.headers[HEADERS.CA_ID];
  const foundCA = await CAModel.findById(CA_ID);
  if (!foundCA) throw new BadRequestError("Could not find", "CA is not valid");
  const signature = req.headers[HEADERS.SIGNATURE];
  if (!signature)
    throw new BadRequest("Request failed", "Could not find signature");
  const result = verifySignature(req.body, signature, foundCA.publicKey);
  if (!result) throw new BadRequestError("Request failed", "Invalid signature");
  next();
});
