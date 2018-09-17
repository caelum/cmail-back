import HttpStatus from 'http-status'

export const defaultResponse = (response, data, statusCode = HttpStatus.OK) => { 
    response.status(statusCode)
    response.json(data)
}

export const errorResponse = (response, error, statusCode = HttpStatus.BAD_REQUEST) => {
    
    const body = error.body || []

    return defaultResponse(response, {
        body: [...body],
        message: error.message,
    }, statusCode)
}