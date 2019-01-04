import Joi from 'joi'

export const authSchema = Joi.object({
    authorization: Joi.string().required()
});