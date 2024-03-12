const ERROR_CODE = {
    NOT_FOUND: 404,
    BAD_REQUEST: 400
}
class ResponseError extends Error {
    constructor(status, message) {
        super(message)
        this.status = status
    }
}

class BadRequestError extends ResponseError {
    constructor(message) {
        super(ERROR_CODE.BAD_REQUEST, message)
    }
}

class NotFoundError extends ResponseError {
    constructor(message) {
        super(ERROR_CODE.NOT_FOUND, message)
    }
}

module.exports = {
    NotFoundError,
    BadRequestError
}