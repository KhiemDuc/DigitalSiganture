const ERROR_CODE = {
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  INTERNAL_SERVER: 500,
};
class ResponseError extends Error {
  constructor(status, message, reason) {
    super(message);
    this.status = status;
    this.reason = reason;
  }
}

class BadRequestError extends ResponseError {
  constructor(message, reason) {
    super(ERROR_CODE.BAD_REQUEST, message, reason);
  }
}

class NotFoundError extends ResponseError {
  constructor(message, reason) {
    super(ERROR_CODE.NOT_FOUND, message, reason);
  }
}

class ForbiddenError extends ResponseError {
  constructor(message, reason) {
    super(ERROR_CODE.FORBIDDEN, message, reason);
  }
}

class InternalServerError extends ResponseError {
  constructor(message, reason) {
    super(ERROR_CODE.INTERNAL_SERVER, message, reason);
  }
}

module.exports = {
  NotFoundError,
  BadRequestError,
  ForbiddenError,
  InternalServerError,
};
