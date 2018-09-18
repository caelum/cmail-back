import HttpStatus from 'http-status'

export const defaultResponse = (response, data, statusCode = HttpStatus.OK) => { 
    response.status(statusCode)
    response.json(data)
}

export const errorResponse = (response, errorData, statusCode = HttpStatus.BAD_REQUEST) => {
    const error = errorResponseDTO(errorData)
    const body = error.body || ''

    return defaultResponse(response, {
        message: error.message,
        body: body,
    }, statusCode)
}

const errorResponseDTO = (errorData) => {
    const err = new Error(errorData.message)
    err.body = errorData.body
    return err
}