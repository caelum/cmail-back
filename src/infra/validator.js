import Joi from 'joi'

class Validator {
    _errors = {}
    _validations = []

    constructor(request, validations) {
        this._request = request
        for(const validation in validations) {
            this._validations[validation] = new Validation(validation, validations[validation])
        }

    }

    validate = () => {
        for(const validation in this._validations) {
            const validationObj = this._validations[validation]
            const { error } = Joi
                    .validate(
                        this._request[validation],
                        validationObj._validationSchema,
                        {abortEarly: false}
                    )
            if(error) {
                this._errors[validation] = formatJoiErrors(error)
            }
        }
    }

    getErrors = () => {
        return { ...this._errors }
    }

    hasErrors = () => {
        return Boolean(Object.keys(this._errors).length)
    }
}

class Validation {
    _ignoreUnknown = false

    constructor(validationType, validationSchema) {
        this.setValidationType(validationType)
        this.setValidationSchema(validationSchema)
    }

    isBody(validationType) {
        const isBody = validationType === 'body'
        if(isBody) {
            this._ignoreUnknown = true
            return true
        }
        return false
    }

    isHeader(validationType) {
        const isHeader = validationType === 'headers'
        if(isHeader) {
            this._ignoreUnknown = true
            return true
        }
        return false
    }

    isValidValidationType(validationType) {
        return this.isHeader(validationType) || this.isBody(validationType)
    }

    setValidationType(validationType) {
        if(this.isValidValidationType(validationType)) {
            this._validationType = validationType
            return;
        }
        throw new Error('Invalid validation type')
    }

    setValidationSchema(validationSchema) {
        if(this._ignoreUnknown) {
            this._validationSchema = validationSchema.unknown()
            return;
        }
        this._validationSchema = validationSchema
    }

    getErrors() {
        const { errors } = Joi.validate(req.headers, schema, {abortEarly: false});
        return errors
    }
}

export const validatorMiddleware = (validations) => (req,res,next) => {
    
    const validator = new Validator(req,validations)

    validator.validate()
    req.validations = {
        hasErrors: validator.hasErrors,
        errors: {
            message: 'Missing/Invalid information',
            body: {
                errors: validator.getErrors()
            }
        }
    }

    next()
}

const formatJoiErrors = (joiError) => {
    const errResponseFormated = joiError.details.reduce((errorObj, currentError) => {
        const fieldName = currentError.context.key
        
        errorObj[fieldName] = errorObj[fieldName] || []
        
        errorObj[fieldName].push({
            type: currentError.type,
            message: currentError.message
        })
        return errorObj
    }, {})


    const errorData = {
        message: 'Please fill all fields correctly',
        validations: errResponseFormated
    }

    return errorData
}