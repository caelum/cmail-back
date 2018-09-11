import HttpStatus from 'http-status'

export const defaultResponse = (response, data, statusCode = HttpStatus.OK) => { 
    response.status(statusCode)
    response.json(data)
}

export const errorResponse = (response, error, statusCode = HttpStatus.BAD_REQUEST) => {
    return defaultResponse(response, {
        ...error.body,
        message: error.message,
    }, statusCode)
}