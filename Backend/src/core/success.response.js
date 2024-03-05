const SUCCESS_STATUS_CODE = {
    SUCCESS: 200,
    CREATED: 201,
}
class Response {
    constructor({status, message, data}) {
        this.status = status
        this.message = message
        this.data = data
    }
    send(res) {
        return res.status(this.status).json({message: this.message, data: this.data})
    }
}

class SuccessResponse extends Response {
    constructor({message = 'OK', data}) {
        super({status: SUCCESS_STATUS_CODE.SUCCESS, data, message})
    }
}
class CreatedResponse extends Response {
    constructor({message = 'Created', data}) {
        super({status: SUCCESS_STATUS_CODE.CREATED, data, message})
    }
}

module.exports = {
    SuccessResponse,
    CreatedResponse
}