const ERROR_CODE = {
    NOT_FOUND: 404
}
class ResponseError extends Error {
    constructor(status, message) {
        super(message)
        this.status = status
    }
}

class NotFoundError extends ResponseError {
    constructor(message) {
        super(ERROR_CODE.NOT_FOUND, message)
    }
}

module.exports = {
    NotFoundError
}